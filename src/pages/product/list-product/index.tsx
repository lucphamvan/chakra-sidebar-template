import { Box, HStack } from "@chakra-ui/react";
import Card from "component/Card";
import { DataTable } from "component/data-table";
import SearchInput from "component/data-table/search-input";
import PageHeading from "component/page-heading";
import { TABLE_HEIGHT } from "config";
import { Product } from "model/Product";
import { useCallback, useState } from "react";
import { Row, SortingRule } from "react-table";
import productService from "services/product.service";

import { buildOrderByQuery } from "../helper";
import { columns } from "./column";
import MultipleSelectedMenu from "./multiple-menu";

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
            <PageHeading>Product Management Page</PageHeading>
            <Card width={"100%"} p={0} mt={4}>
                <HStack p={4}>
                    <SearchInput setSearch={setSearch} triggerSeach={toggleRefresh} />
                </HStack>
                <Box h={TABLE_HEIGHT} display="flex" flexDir="column" overflow="auto">
                    <DataTable
                        getData={getProducts}
                        totalPage={pageCount}
                        columns={columns(toggleRefresh)}
                        data={products}
                        isRefresh={isRefresh}
                        /** this component will inject to DataTable */
                        multipleMenu={renderMultipleMenu}
                    />
                </Box>
            </Card>
        </>
    );
};

export default ProductList;
