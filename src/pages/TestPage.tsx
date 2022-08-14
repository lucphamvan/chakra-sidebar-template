import { Box, Flex } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import PageHeading from "component/page-heading";
import usePopup from "context/modal-provider";
import { useState } from "react";
import productService from "services/product.service";

export default function PageHome() {
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { confirm } = usePopup();

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
            const ok = await confirm("Do you want delete all products ?");
            if (!ok) {
                return;
            }
            setLoadingDelete(true);
            await productService.deleteAllProducts();
        } catch (error) {
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <>
            <PageHeading>Test Page</PageHeading>
            <Card width={"initial"} mt={4} height="calc(100% - 4rem)">
                <Box mb={4} fontSize="1.2rem" fontWeight="600">
                    Test function
                </Box>
                <Flex gap={4} wrap="wrap">
                    <Button onClick={generateProducts} isLoading={loadingGenerate}>
                        Generate Products
                    </Button>
                    <Button mode="secondary" onClick={deleteAllProducts} isLoading={loadingDelete}>
                        Delete All Products
                    </Button>
                </Flex>
            </Card>
        </>
    );
}
