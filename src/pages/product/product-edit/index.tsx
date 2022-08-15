import { Divider, Flex, FlexProps, GridItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Loading from "component/loading";
import PageHeading from "component/page-heading";
import { MEDIA_QUERY, STYLE } from "config";
import { Product } from "model/Product";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import productService from "services/product.service";

import ImageEdit from "./image-edit";
import { Grid } from "./index.styled";
import InfoEdit from "./info-edit";

interface Props extends FlexProps {
    bglocation: any;
}

const Wrapper = styled(Flex)<Props>`
    background: ${STYLE.background};
    flex-direction: column;
    padding: 1.5rem 1rem;

    height: calc(100% - 5rem);
    position: fixed;
    top: 5rem;
    z-index: 10;

    width: 100%;
    margin-left: 0; // magic here
    overflow: auto;

    ${MEDIA_QUERY.md} {
        padding: 1.5rem 2rem;
        width: calc(100% - 18rem);
        margin-left: ${(props) => (props.bglocation ? `18rem` : "-2rem")}; // magic here
    }
`;

const ProductEditPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const bgLocation = location.state && (location.state as any).background; // enter from url

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
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "initial";
        };
    }, []);

    useEffect(() => {
        id && getProduct(id);
        return () => setProduct(undefined);
    }, [id]);

    if (isLoading) {
        return <Loading w="100%" h="100%" />;
    }

    // render
    if (!product) {
        return (
            <>
                <PageHeading>Edit Product</PageHeading>
                <Text>This product is nolonger exist</Text>
            </>
        );
    }

    return (
        <Wrapper bglocation={bgLocation}>
            <PageHeading>Edit Product</PageHeading>
            <Grid mt={4}>
                <GridItem>
                    <InfoEdit product={product} />
                </GridItem>
                <GridItem>
                    <Divider orientation="vertical" />
                </GridItem>
                <GridItem>
                    <ImageEdit product={product} />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
export default ProductEditPage;
