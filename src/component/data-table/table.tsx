import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Table, Thead, Tr, Th, chakra, Tbody, Td, Box } from "@chakra-ui/react";
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";

type TableUIProps<T extends object> = {
    getTableProps: (propGetter?: TablePropGetter<T> | undefined) => TableProps;
    getTableBodyProps: (propGetter?: TableBodyPropGetter<T> | undefined) => TableBodyProps;
    headerGroups: HeaderGroup<T>[];
    prepareRow: (row: Row<T>) => void;
    page: Row<T>[];
};

const TableUI = <T extends object>(props: TableUIProps<T>) => {
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = props;
    return (
        <Box flex={1} overflow="auto">
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} bg="#F3F2F7">
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    isNumeric={(column as any).isNumeric}
                                >
                                    {column.render("Header")}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()} isNumeric={(cell.column as any).isNumeric}>
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TableUI;
