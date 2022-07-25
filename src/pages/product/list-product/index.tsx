import { Box, HStack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Card from "component/Card";
import { DataTable } from "component/data-table";
import SearchInput from "component/data-table/search-input";
import PageHeading from "component/page-heading";
import { TABLE_HEIGHT } from "config";
import { Product } from "model/Product";
import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { Row, SortingRule } from "react-table";
import productService from "services/product.service";

import { buildOrderByQuery } from "../helper";
import { columns } from "./column";
import Filter from "./filter";
import MultipleSelectedMenu from "./multiple-menu";

const TableWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: ${TABLE_HEIGHT};
    td {
        border: none;
    }
`;

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [search, setSearch] = useState("");

    const toggleRefresh = () => {
        setIsRefresh((value) => !value);
    };

    // function get data from server with pagination + sort
    // this function will pass to DataTable and call in it
    // we need control data and page count in this function
    // remember useCallback to prevent bug not able sort
    const getProducts = useCallback(
        async (pageIndex: number, pageSize: number, sortBy?: SortingRule<Product>[]) => {
            const orderBy = buildOrderByQuery(sortBy);
            try {
                const { items, count } = await productService.getProducts(pageIndex, pageSize, orderBy, search);
                setProducts(items);
                setPageCount(Math.ceil(count / pageSize));
            } catch (error: any) {
                console.log("failed to get list product", error.message);
            }
        },
        [search]
    );

    const renderMultipleMenu = useCallback(
        (selectedFlatRows: Row<object>[], toggleAllRowsSelected: (value?: boolean | undefined) => void) => (
            <MultipleSelectedMenu
                toggleAllRowsSelected={toggleAllRowsSelected}
                selectedFlatRows={selectedFlatRows}
                reload={toggleRefresh}
            />
        ),
        []
    );

    return (
        <>
            <PageHeading>Product management</PageHeading>
            <HStack py={4} justifyContent="space-between">
                <HStack spacing={4}>
                    <Text fontWeight={600}>Search Product</Text>
                    <SearchInput setSearch={setSearch} triggerSeach={toggleRefresh} />
                    <Filter />
                </HStack>
            </HStack>
            <Card width={"100%"} p={0}>
                <TableWrapper>
                    <DataTable
                        getData={getProducts}
                        totalPage={pageCount}
                        columns={columns(toggleRefresh)}
                        data={products}
                        isRefresh={isRefresh}
                        /** this component will inject to DataTable */
                        multipleMenu={renderMultipleMenu}
                    />
                </TableWrapper>
            </Card>
        </>
    );
};

export default ProductList;
