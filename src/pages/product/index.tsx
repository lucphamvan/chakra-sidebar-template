import Card from "component/Card";
import PageHeading from "component/page-heading";

import ProductGrid from "./list-product/product-grid";

// import ProductList from "./list-product/product-list";

const ProductPage = () => {
    return (
        <>
            <PageHeading>Product Page</PageHeading>
            <ProductGrid />
        </>
    );
};

export default ProductPage;
