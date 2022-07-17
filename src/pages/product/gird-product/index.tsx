import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BREAKPOINT, STYLE } from "config";
import { Product } from "model/Product";
import { useCallback, useEffect, useRef, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import productService from "services/product.service";

import ProductItem from "./product-item";

const ItemContainer = styled(Box)`
    box-sizing: border-box;
`;

const ListContainer = styled(Box)`
    display: grid;
    gap: 2rem;
    background-color: ${STYLE.background};
    margin-top: 1rem;
    padding: 0 2rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @media (min-width: ${BREAKPOINT.sm}) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    @media (min-width: ${BREAKPOINT.md}) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: ${BREAKPOINT.lg}) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: ${BREAKPOINT.xl}) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
`;

const LIMIT = 30;
const ProductGrid = () => {
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
            console.log("error get more product : ", error.message);
        }
    };

    useEffect(() => {
        getProductMore(refPage.current, LIMIT);
    }, []);

    const renderItem = useCallback(
        (index: number) => {
            const item = products[index];
            return <ProductItem item={item} />;
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
};
export default ProductGrid;
