import { Checkbox, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { Column, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import Pagination from "./pagination";
import TableUI from "./table";
import { PaginationProp } from "./type";

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, checked, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox colorScheme="primary" isChecked={checked} ref={resolvedRef} {...rest} />;
});

export type DataTableProps<T extends object> = {
    data: T[];
    columns: Column<T>[];
    getData: Function;
    totalPage: number;
    multipleMenu?: (...params: any) => React.ReactNode;
};

export const DataTable = <T extends object>({ data, columns, getData, totalPage, multipleMenu }: DataTableProps<T>) => {
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
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            manualSortBy: true, // Tell the sortby
            autoResetPage: false,
            autoResetSortBy: false,
            autoResetRowState: false,
            pageCount: totalPage
        },
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
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
    );

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
        setLoading(true);
        getData(pageIndex, pageSize, sortBy).finally(() => setLoading(false));
        // eslint-disable-next-line
    }, [pageIndex, pageSize, sortBy]);

    return (
        <>
            <TableUI {...tableUIProps} />
            <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Pagination {...paginationProps} />
                {multipleMenu && multipleMenu(selectedFlatRows, toggleAllRowsSelected)}
            </Flex>
        </>
    );
};
