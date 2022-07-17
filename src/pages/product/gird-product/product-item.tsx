import { Avatar, Box, Flex, Grid, GridItem, Image, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useRef } from "react";

const ItemWrapper = styled(Box)`
    /* box-shadow: ${STYLE.shadowCard}; */
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border-radius: 0.25rem;
    /* background-color: #fff; */
    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
`;

interface Props {
    item: Product;
}
const ProductItem = ({ item }: Props) => {
    const ref = useRef<any>();
    return (
        <ItemWrapper h={(ref?.current?.clientWidth * 3) / 5 + 90}>
            <Image
                ref={ref}
                src={item.imgUrl}
                width="100%"
                h={(ref?.current?.clientWidth * 3) / 5}
                bg="gray.900"
                objectFit="scale-down"
                userSelect="none"
            />
            <Grid gridTemplateColumns="4rem minmax(0, 1fr)">
                <GridItem>
                    <Avatar fontWeight="black" color="#fff" size="md" name={item.user?.name} />
                </GridItem>
                <GridItem>
                    <Box fontWeight="semibold" fontSize="1.125rem" noOfLines={1}>
                        {item.name}
                    </Box>
                    <Box fontWeight="14px" color="gray.500" noOfLines={1}>
                        {item.description}
                    </Box>
                    <Flex>
                        <Box>
                            Price:{" "}
                            <chakra.span fontWeight="semibold" color={STYLE.errorColor}>
                                {item.price}$
                            </chakra.span>
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </ItemWrapper>
    );
};
export default ProductItem;
