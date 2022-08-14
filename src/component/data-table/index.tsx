import { Checkbox, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { Column, TableOptions, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import { SIZE_OPTION } from "./config";
import Pagination from "./pagination";
import TableUI from "./table";
import { PaginationProp } from "./type";

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, checked, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox mt="2px" colorScheme="primary" isChecked={checked} ref={resolvedRef} {...rest} />;
});

export type DataTableProps<T extends object> = {
    data: T[];
    columns: Column<T>[];
    getData?: Function;
    totalPage?: number;
    multipleMenu?: (...params: any) => React.ReactNode;
    isRefresh?: boolean;
    serverSideRender?: boolean;
    enableSelectRow?: boolean;
    goFirstPage?: boolean;
};

export const DataTable = <T extends object>({
    data,
    columns,
    getData,
    totalPage,
    multipleMenu,
    isRefresh,
    serverSideRender = false,
    enableSelectRow = false,
    goFirstPage
}: DataTableProps<T>) => {
    // define table option
    let tableOption: TableOptions<T> = {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: SIZE_OPTION[0] }, // Pass our hoisted table state,
        autoResetPage: false,
        autoResetSortBy: false,
        autoResetRowState: false
    };
    // if server side render => add more option
    if (serverSideRender) {
        tableOption = {
            ...tableOption,
            manualPagination: true, // Tell the usePagination
            manualSortBy: true, // Tell the sortby
            pageCount: totalPage
        };
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        toggleAllRowsSelected,
        state: { pageIndex, pageSize, sortBy }
    } = useTable(tableOption, useSortBy, usePagination, useRowSelect, (hooks) => {
        if (enableSelectRow) {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                    ),
                    Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
                    width: "1%",
                    minWidth: 70,
                    maxWidth: 80
                },
                ...columns
            ]);
        }
    });

    const [loading, setLoading] = useState(true);

    const paginationProps: PaginationProp = {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize
    };

    const tableUIProps = {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        loading
    };

    useEffect(() => {
        if (!serverSideRender) {
            setLoading(false);
            return;
        }
        setLoading(true);
        getData && getData(pageIndex, pageSize, sortBy).finally(() => setLoading(false));
        // eslint-disable-next-line
    }, [pageIndex, pageSize, sortBy, isRefresh]);

    useEffect(() => {
        gotoPage(0);
    }, [goFirstPage, gotoPage]);

    return (
        <>
            <TableUI {...tableUIProps} />
            <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" mt={4}>
                {!!data?.length && <Pagination {...paginationProps} />}
                {multipleMenu && multipleMenu(selectedFlatRows, toggleAllRowsSelected)}
            </Flex>
        </>
    );
};
