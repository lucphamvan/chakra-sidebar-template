import { Box, Center, useToast } from "@chakra-ui/react";
import Button from "component/button";
import { notifyError, notifySuccess } from "component/toast";
import usePopup from "context/modal-provider";
import { Product } from "model/Product";
import React from "react";
import { Row } from "react-table";
import productService from "services/product.service";

const genericMemo: <T>(component: T) => T = React.memo;

type MultipleSelectedMenuProp<T extends object> = {
    selectedFlatRows: Row<T>[]; // list selected row
    toggleAllRowsSelected: (value?: boolean | undefined) => void; // function to toggle selected row
    reload?: () => void;
};

const MultipleSelectedMenu = <T extends object>({
    selectedFlatRows,
    toggleAllRowsSelected,
    reload
}: MultipleSelectedMenuProp<T>) => {
    const { confirm } = usePopup();
    const toast = useToast({ duration: 3000, position: "top-right" });

    // delete single product
    const deleteProduct = async (product: Product) => {
        try {
            await productService.delete(product);
            // notifySuccess(toast, `Delete product ${product.name} successfull`);
        } catch (error: any) {
            console.log(`Failed to delete product ${product.name}`, error.message);
            notifyError(toast, `Delete product ${product.name} failed`);
        }
    };

    // function handle delete row select
    const handleDelete = async () => {
        const content = (
            <Box fontWeight="bold">Are you sure to want delete these {selectedFlatRows.length} products ?</Box>
        );
        const ok = await confirm(content);
        if (!ok) {
            return;
        }
        const promiseArr = selectedFlatRows.map((row) => {
            return deleteProduct(row.original as Product);
        });
        await Promise.all(promiseArr);
        notifySuccess(toast, `Delete products successfull`);
        reload && reload();
        toggleAllRowsSelected(false);
    };

    // no render if no raw selected
    if (!selectedFlatRows?.length) {
        return null;
    }

    // render
    return (
        <Center p={4} fontWeight={700} gap={4}>
            <Box>{selectedFlatRows.length} select</Box>
            <Button mode="primary" onClick={handleDelete}>
                Delete
            </Button>
            <Button mode="secondary" onClick={() => toggleAllRowsSelected(false)}>
                Cancel
            </Button>
        </Center>
    );
};

export default genericMemo(MultipleSelectedMenu);
