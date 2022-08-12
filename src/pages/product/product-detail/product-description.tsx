import { Box, Flex, GridItem } from "@chakra-ui/react";
import { formatDate, formatPrice } from "common/helper";
import Button from "component/button";
import PageHeading from "component/page-heading";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useNavigate } from "react-router-dom";

interface Props {
    product: Product;
}
const ProductDescription = ({ product }: Props) => {
    const navigate = useNavigate();

    return (
        <GridItem>
            <Flex flexDir="column" gap={2}>
                <Box>
                    <PageHeading fontWeight="black">{product.name}</PageHeading>
                    <Box>{product.code}</Box>
                </Box>
                <Flex color={STYLE.primaryColor} fontSize={"4xl"} alignItems="center" gap={2}>
                    <Box>{formatPrice(product.price)}</Box>
                </Flex>
                <Box color={STYLE.primaryColor} fontWeight="semibold">
                    Quantity : {product.amount}
                </Box>
                <Box>Created at : {formatDate(product.createdAt!)}</Box>
                <Box>{product.description}</Box>
                <Box mt={2}>
                    <Button onClick={() => navigate(-1)} mode="secondary">
                        Back
                    </Button>
                </Box>
            </Flex>
        </GridItem>
    );
};
export default ProductDescription;
