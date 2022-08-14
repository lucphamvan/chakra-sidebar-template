import { Box, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Button from "component/button";
import Loading from "component/loading";
import { BREAKPOINT, STYLE } from "config";
import { Product } from "model/Product";
import { useCallback, useEffect, useRef, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import productService from "services/product.service";
import { OrderBy } from "type";

import ProductItem from "./product-item";

const ItemContainer = styled(Box)`
    box-sizing: border-box;
`;

const ListContainer = styled(Box)`
    display: grid;
    gap: 1rem;
    background-color: ${STYLE.background};
    margin-top: 1rem;
    grid-template-columns: repeat(1, minmax(20rem, 1fr));
    overflow-x: auto;

    @media (min-width: ${BREAKPOINT.sm}) {
        grid-template-columns: repeat(1, minmax(20rem, 1fr));
    }

    @media (min-width: ${BREAKPOINT.md}) {
        grid-template-columns: repeat(2, minmax(15rem, 1fr));
    }

    @media (min-width: ${BREAKPOINT.lg}) {
        grid-template-columns: repeat(3, minmax(16rem, 1fr));
    }

    @media (min-width: ${BREAKPOINT.xl}) {
        grid-template-columns: repeat(5, minmax(20rem, 1fr));
    }
`;

const Footer = ({ loading, loadMore }: { loading: boolean; loadMore: any }) => {
    return (
        <Center>
            <Button mt={8} isLoading={loading} onClick={loadMore}>
                Load more
            </Button>
        </Center>
    );
};

const LIMIT = 30;
const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [totalProduct, setTotalProduct] = useState(0);
    const refPage = useRef(0);

    const loadMore = () => {
        getProductMore(refPage.current, LIMIT);
    };

    const getProductMore = async (page: number, limit: number) => {
        try {
            setLoading(true);
            const orderBy: OrderBy[] = [{ createdAt: "desc" }];
            const { items, count } = await productService.getProducts(page, limit, orderBy);
            setProducts((value) => [...value, ...items]);
            setTotalProduct(count);
            refPage.current += 1;
        } catch (error: any) {
            console.log("error get more product : ", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductMore(refPage.current, LIMIT).finally(() => setIsLoading(false));
    }, []);

    const renderItem = useCallback(
        (index: number) => {
            const item = products[index];
            return <ProductItem item={item} />;
        },
        [products]
    );

    if (isLoading) {
        return <Loading w="100%" h="100%" />;
    }

    return (
        <>
            <VirtuosoGrid
                totalCount={products.length}
                useWindowScroll //
                overscan={0}
                // endReached={loadMore}
                components={{
                    Item: ItemContainer,
                    List: ListContainer as any
                }}
                itemContent={renderItem}
            />
            {Boolean(products.length) && products.length < totalProduct && (
                <Footer loadMore={loadMore} loading={loading} />
            )}
        </>
    );
};
export default ProductGrid;
