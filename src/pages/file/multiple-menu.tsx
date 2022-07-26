import { Box, Center, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import { notifyError } from "component/Toast";
import usePopup from "context/modal-provider";
import { File } from "model/File";
import React from "react";
import { Row } from "react-table";
import fileService from "services/file.service";

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
    const toast = useToast({ duration: 3000, position: "top-right" });
    const { confirm } = usePopup();
    // delete single file
    const deleteFile = async (file: File) => {
        try {
            await fileService.delete(file);
            // notifySuccess(toast, `Delete file ${file.orginalName} successfull`);
        } catch (error: any) {
            console.log(`Failed to delete file ${file.orginalName}`, error.message);
            notifyError(toast, `Delete file ${file.orginalName} failed`);
        }
    };

    // function handle delete row select
    const handleDelete = async () => {
        const ok = await confirm(`Are you sure to delete ${selectedFlatRows.length} files ?`);
        if (!ok) {
            return;
        }
        const promiseList: Promise<any>[] = [];
        selectedFlatRows.forEach((row) => {
            const promise = deleteFile(row.original as File);
            promiseList.push(promise);
        });
        await Promise.all(promiseList);
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
