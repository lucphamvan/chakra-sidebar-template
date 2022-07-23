import { Box, Flex } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import PageHeading from "component/page-heading";
import { useState } from "react";
import productService from "services/product.service";

export default function PageHome() {
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const generateProducts = async () => {
        try {
            setLoadingGenerate(true);
            await productService.generateProducts();
        } catch (error) {
        } finally {
            setLoadingGenerate(false);
        }
    };

    const deleteAllProducts = async () => {
        try {
            setLoadingDelete(true);
            await productService.deleteAllProducts();
        } catch (error) {
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <>
            <PageHeading>Home Page</PageHeading>
            <Card width={"initial"} mt={4} height="calc(100% - 5rem)">
                <Box mb={4} fontSize="2rem" fontWeight="bold">
                    Test function
                </Box>
                <Flex gap={4} wrap="wrap">
                    <Button minW="max-content" onClick={generateProducts} isLoading={loadingGenerate}>
                        Generate Products
                    </Button>
                    <Button minW="max-content" onClick={deleteAllProducts} isLoading={loadingDelete}>
                        Delete All Products
                    </Button>
                </Flex>
            </Card>
        </>
    );
}
