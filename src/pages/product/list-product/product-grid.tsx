import { Box, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { Product } from "model/Product";
import { useCallback, useEffect, useRef, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import productService from "services/product.service";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const ItemContainer = styled(Box)`
    box-sizing: border-box;
    flex-grow: 1;
    flex-basis: 100%;
    flex-shrink: 0;
    ${mq[0]} {
        flex-basis: 45%;
    }
    ${mq[1]} {
        flex-basis: 30%;
    }
    ${mq[2]} {
        flex-basis: 23%;
    }
`;

const ListContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background-color: ${STYLE.background};
    margin-top: 1rem;
    justify-content: space-between;
`;

const ItemWrapper = styled(Box)`
    padding: 1rem;
    box-shadow: ${STYLE.shadowCard};
    height: 12rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;

    transition: transform 250ms;
    &:hover {
        /* animation: tada;
        animation-duration: 1s; */
        transform: translateY(-10px);
    }
`;

const LIMIT = 30;
export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const refPage = useRef(0);

    const loadMore = () => {
        getProductMore(refPage.current, LIMIT);
    };

    const getProductMore = async (page: number, limit: number) => {
        try {
            const { items } = await productService.getProducts(page, limit);
            setProducts((value) => [...value, ...items]);
            refPage.current += 1;
        } catch (error: any) {
            console.log("errr", error.message);
        }
    };

    useEffect(() => {
        getProductMore(refPage.current, LIMIT);
    }, []);

    const handleSelect = (index: number) => {
        console.log(index);
    };

    const renderItem = useCallback(
        (index: number) => {
            const item = products[index];
            return (
                <ItemWrapper onClick={() => handleSelect(index)}>
                    <Box color={STYLE.primaryColor} fontWeight="semibold" fontSize="1.125rem" noOfLines={1}>
                        {item.name}
                    </Box>
                    <Box fontWeight="14px" color="gray.500" noOfLines={1}>
                        {item.description}
                    </Box>
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
        },
        [products]
    );

    return (
        <VirtuosoGrid
            totalCount={products.length}
            useWindowScroll //
            overscan={0}
            endReached={loadMore}
            components={{
                Item: ItemContainer,
                List: ListContainer as any
            }}
            itemContent={renderItem}
        />
    );
}
