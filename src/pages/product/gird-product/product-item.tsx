import { Box, Grid, GridItem } from "@chakra-ui/react";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Avatar, Image, ItemWrapper, Skeleton } from "./product-item.styled";

interface Props {
    item: Product;
}
const ProductItem = ({ item }: Props) => {
    const ref = useRef<any>();
    const location = useLocation();
    const navigate = useNavigate();

    const viewDetail = () => {
        navigate(`/products/${item.id}`, { state: { background: location } });
    };

    return (
        <ItemWrapper onClick={viewDetail}>
            <Image ref={ref} src={item.imgUrl} fallback={<Skeleton />} />
            <Grid gridTemplateColumns="minmax(0, 1fr) 4rem">
                <GridItem display="flex" flexDirection="column">
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
