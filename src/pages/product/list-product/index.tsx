import { Box, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Button from "component/button";
import Card from "component/card";
import { DataTable } from "component/data-table";
import SearchInput from "component/data-table/search-input";
import PageHeading from "component/page-heading";
import { TABLE_HEIGHT } from "config";
import { Product } from "model/Product";
import { useCallback, useState } from "react";
import { MdRefresh } from "react-icons/md";
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
`;

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [search, setSearch] = useState("");
    const [go1stPage, setGo1stPage] = useState(false);

    const toggleRefresh = () => {
        setIsRefresh((value) => !value);
    };

    const triggerSearch = () => {
        setGo1stPage((value) => !value);
        setTimeout(toggleRefresh, 50);
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
                <Box width="max-content" display="flex" alignItems="center" w="100%" gap="4">
                    <Box fontWeight={600}>Search Product</Box>
                    <SearchInput setSearch={setSearch} triggerSeach={triggerSearch} />
                    <Filter />
                    <Button leftIcon={<MdRefresh />} onClick={toggleRefresh}>
                        Refresh
                    </Button>
                </Box>
            </HStack>
            <Card width={"100%"} p={0}>
                <TableWrapper>
                    <DataTable
                        getData={getProducts}
                        totalPage={pageCount}
                        columns={columns(toggleRefresh)}
                        data={products}
                        isRefresh={isRefresh}
                        goFirstPage={go1stPage}
                        multipleMenu={renderMultipleMenu} /** this component will inject to DataTable */
                        serverSideRender
                        enableSelectRow
                    />
                </TableWrapper>
            </Card>
        </>
    );
};

export default ProductList;
