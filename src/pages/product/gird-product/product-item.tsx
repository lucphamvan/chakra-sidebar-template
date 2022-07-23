import { Box, Avatar as ChakraAvatar, Image as ChakraImage, Grid, GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useRef } from "react";

const ItemWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: #fff;
    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
    aspect-ratio: 5/4; // important to keep ratio and specify height based on width
`;

const Image = styled(ChakraImage)`
    aspect-ratio: 5/3; // important to keep ratio and specify height based on width
    width: 100%;
    object-fit: scale-down;
    user-select: none;
    background: ${STYLE.textColor};
    border-radius: 0.25rem;
`;

const Avatar = styled(ChakraAvatar)`
    font-weight: 900;
    color: #ffffff;
`;

const Skeleton = styled(Box)`
    width: 100%;
    aspect-ratio: 5/3;
    background-color: ${STYLE.background};
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
    item: Product;
}
const ProductItem = ({ item }: Props) => {
    const ref = useRef<any>();
    return (
        <ItemWrapper>
            <Image ref={ref} src={item.imgUrl} fallback={<Skeleton />} />
            <Grid gridTemplateColumns="minmax(0, 1fr) 4rem">
                <GridItem display="flex" gap={2} flexDirection="column">
                    <Box fontWeight="bold" noOfLines={1}>
                        {item.name}
                    </Box>
                    <Box color={STYLE.secondaryColor} noOfLines={1}>
                        {item.description}
                    </Box>
                    <Box fontWeight="bold" color={STYLE.primaryColor}>
                        Price: {item.price} USD
                    </Box>
                </GridItem>
                <GridItem textAlign="end">
                    <Avatar bg="primary.400" name={item.user?.name} />
                </GridItem>
            </Grid>
        </ItemWrapper>
    );
};
export default ProductItem;
