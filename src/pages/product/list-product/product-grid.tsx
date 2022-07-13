import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import productService from "services/product.service";

const ItemBox = styled(Box)`
    padding: 1.5rem 2rem;
    min-width: 20rem;
    flex-basis: 24%;
    box-shadow: ${STYLE.shadowCard};
    background-color: #fff;
    border-radius: ${STYLE.borderRadius};
`;

const LIMIT = 30;
const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const refPage = useRef(0);

    const getProductMore = async (page: number, limit: number) => {
        try {
            const { items, count } = await productService.getProducts(page, limit);
            setHasMore(products.length + items.length < count);
            setProducts((value) => [...value, ...items]);
            refPage.current += 1;
        } catch (error: any) {
            console.log("errr", error.message);
        }
    };

    const loadMore = () => {
        getProductMore(refPage.current, LIMIT);
    };

    useEffect(() => {
        getProductMore(refPage.current, LIMIT).then(() => {
            getProductMore(refPage.current, LIMIT);
        });
        // eslint-disable-next-line
    }, []);

    const renderItems = () => {
        const Items = products.map((item, index) => {
            return (
                <ItemBox key={`item-${index}`} noOfLines={1}>
                    {item.name}
                </ItemBox>
            );
        });
        return Items;
    };

    return (
        <Flex flex={1} id="wrapper-product" overflow={"auto"}>
            <InfiniteScroll
                style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                scrollableTarget="wrapper-product"
                next={loadMore}
                dataLength={products.length}
                hasMore={hasMore}
                loader=""
            >
                {renderItems()}
            </InfiniteScroll>
        </Flex>
    );
};

export default ProductGrid;
