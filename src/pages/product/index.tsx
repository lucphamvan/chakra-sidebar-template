import Card from "component/Card";
import PageHeading from "component/page-heading";

import ProductGrid from "./list-product/product-grid";

// import ProductList from "./list-product/product-list";

const ProductPage = () => {
    return (
        <>
            <PageHeading>Product Page</PageHeading>
            <Card width="initial" mt={4} flex={1} display="flex" flexDir="column" overflow="auto" gap={4}>
                <ProductGrid />
            </Card>
        </>
    );
};

export default ProductPage;
