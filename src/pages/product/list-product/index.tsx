import { SearchIcon } from "@chakra-ui/icons";
import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { DataTable } from "component/data-table";
import { STYLE } from "config";
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

    // function get data from server with pagination + sort
    // this function will pass to DataTable and call in it
    // we need control data and page count in this function
    // remember useCallback to prevent bug not able sort
    const getProducts = useCallback(async (pageIndex: number, pageSize: number, sortBy?: SortingRule<Product>[]) => {
        const orderBy = buildOrderByQuery(sortBy);
        try {
            const { items, count } = await productService.getProducts(pageIndex, pageSize, orderBy);
            setProducts(items);
            setPageCount(Math.ceil(count / pageSize));
        } catch (error: any) {
            console.log("failed to get list product", error.message);
        }
    }, []);

    const renderMultipleMenu = useCallback(
        (selectedFlatRows: Row<object>[], toggleAllRowsSelected: (value?: boolean | undefined) => void) => (
            <MultipleSelectedMenu toggleAllRowsSelected={toggleAllRowsSelected} selectedFlatRows={selectedFlatRows} />
        ),
        []
    );

    return (
        <>
            <HStack>
                <InputGroup maxW={60}>
                    <InputLeftElement children={<SearchIcon color={STYLE.primaryColor} />} />
                    <Input />
                </InputGroup>
            </HStack>
            <DataTable
                getData={getProducts}
                totalPage={pageCount}
                columns={columns}
                data={products}
                /** this component will inject to DataTable */
                multipleMenu={renderMultipleMenu}
            />
        </>
    );
};

export default ProductList;
