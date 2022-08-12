import { Flex, FlexProps, Grid, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Card from "component/card";
import Loading from "component/loading";
import PageHeading from "component/page-heading";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import productService from "services/product.service";

import ProductDescription from "./product-description";
import ProductImages from "./product-images";

interface Props extends FlexProps {
    bglocation: any;
}
const Wrapper = styled(Flex)<Props>`
    flex-direction: column;
    width: calc(100% - 18rem);
    height: calc(100% - 5rem);
    background: ${STYLE.background};
    position: fixed;
    margin-left: ${(props) => (props.bglocation ? `18rem` : "-2rem")}; // magic here
    top: 5rem;
    padding: 1.5rem 2rem;
    z-index: 10;
`;

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const bgLocation = location.state && (location.state as any).background; // enter from url

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "initial";
        };
    }, []);

    const getProduct = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await productService.getProduct(id);
            setProduct(response.data);
        } catch (error: any) {
            console.log(`Failed to get product with id : ${id}`, error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        id && getProduct(id);
        return () => setProduct(undefined);
    }, [id]);

    if (isLoading) {
        return <Loading w="100%" h="100%" />;
    }

    if (!product) {
        return (
            <>
                <PageHeading>Product detail</PageHeading>
                <Text>This product is nolonger exist</Text>
            </>
        );
    }

    return (
        <Wrapper bglocation={bgLocation}>
            <PageHeading>Product detail</PageHeading>
            <Card w="100%" mt={4} overflow="auto">
                <Grid
                    gridTemplateColumns={[
                        "minmax(0, 1fr)",
                        "minmax(0, 1fr)",
                        "minmax(0, 1fr)",
                        "minmax(0, 1fr) minmax(0, 1fr)"
                    ]}
                    gap={8}
                >
                    <ProductImages product={product} />
                    <ProductDescription product={product} />
                </Grid>
            </Card>
        </Wrapper>
    );
};
export default ProductDetailPage;
