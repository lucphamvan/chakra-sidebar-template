import { CheckIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import Card from "component/Card";
import { Color } from "config";
import { Product } from "model/Product";
import { useEffect, useState } from "react";
import { Column } from "react-table";
import productService from "services/product.service";
import { DataTable } from "./data-table";

const columns: Column<Product>[] = [
    {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
            return props.value.toUpperCase();
        },
    },
    {
        Header: "Description",
        accessor: "description",
    },
    {
        Header: "Sold",
        accessor: "sold",
        Cell: (props) => {
            return !props.value ? <CheckIcon color={Color.primary} /> : null;
        },
    },
];
const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await productService.getProducts(page, limit);
                setProducts(response.data);
            } catch (error: any) {
                console.log("failed to get list product", error.message);
            }
        };
        getProducts();
        return () => setProducts([]);
    }, [page, limit]);

    useEffect(() => {
        const getTotalProducts = async () => {
            try {
                const response = await productService.count();
                setTotal(response.data);
            } catch (error: any) {
                console.log("failed to get product count", error.message);
            }
        };
        getTotalProducts();
        return () => setTotal(0);
    }, [page, limit]);

    return (
        <>
            <Heading>Product Page</Heading>
            <Card width={"initial"} mt={4}>
                <DataTable columns={columns} data={products} />
            </Card>
        </>
    );
};

export default ProductPage;
