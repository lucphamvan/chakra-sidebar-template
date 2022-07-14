import { Box, Image, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { Product } from "model/Product";

const ItemWrapper = styled(Box)`
    padding: 1rem;
    box-shadow: ${STYLE.shadowCard};
    height: 22rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;

    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
`;

interface Props {
    item: Product;
}
const ProductItem = ({ item }: Props) => {
    return (
        <ItemWrapper>
            <Box color={STYLE.primaryColor} fontWeight="semibold" fontSize="1.125rem" noOfLines={1}>
                {item.name}
            </Box>
            <Box fontWeight="14px" color="gray.500" noOfLines={1}>
                {item.description}
            </Box>
            <Image src={item.imgUrl} boxSize="10rem" objectFit="cover" userSelect="none" />
            <Box>
                Amount :{" "}
                <chakra.span fontWeight="semibold" color={STYLE.primaryColor}>
                    {item.amount}
                </chakra.span>
            </Box>
            <Box>
                Price:{" "}
                <chakra.span fontWeight="semibold" color={STYLE.errorColor}>
                    {item.price}$
                </chakra.span>
            </Box>
            <Box>{item.User?.name}</Box>
        </ItemWrapper>
    );
};
export default ProductItem;
