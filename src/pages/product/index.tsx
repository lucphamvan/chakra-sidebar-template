import { Heading } from "@chakra-ui/react";
import Card from "component/Card";
import { Product } from "model/Product";
import { useCallback, useState } from "react";
import { Row, SortingRule } from "react-table";
import productService from "services/product.service";
import { columns } from "./columns";
import { DataTable } from "component/data-table";
import { buildOrderByQuery } from "./helper";
import MultipleSelectedMenu from "./multiple-menu";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);

    // function get data from server with pagination + sort
    // this function will pass to DataTable and call in it
    // we need control data and page count in this function
    // remember useCallback to prevent bug not able sort
    const getProducts = useCallback(async (pageIndex: number, pageSize: number, sortBy?: SortingRule<Product>[]) => {
        const orderBy = buildOrderByQuery(sortBy);
        try {
            const response = await productService.getProducts(pageIndex, pageSize, orderBy);
            setProducts(response.data.products);
            setPageCount(Math.ceil(response.data.count / pageSize));
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
            <Heading>Product Page</Heading>
            <Card width={"initial"} mt={4} flex={1} display="flex" flexDir="column" overflow="auto">
                <DataTable
                    getData={getProducts}
                    totalPage={pageCount}
                    columns={columns}
                    data={products}
                    /** this component will inject to DataTable */
                    multipleMenu={renderMultipleMenu}
                />
            </Card>
        </>
    );
};

export default ProductPage;
