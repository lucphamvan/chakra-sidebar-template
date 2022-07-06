import { Row } from "react-table";
import { Box, Center } from "@chakra-ui/react";
import Button from "component/Button";
import React from "react";

const genericMemo: <T>(component: T) => T = React.memo;

type MultipleSelectedMenuProp<T extends object> = {
    selectedFlatRows: Row<T>[];
    toggleAllRowsSelected: (value?: boolean | undefined) => void;
};

const MultipleSelectedMenu = <T extends object>({
    selectedFlatRows,
    toggleAllRowsSelected,
}: MultipleSelectedMenuProp<T>) => {
    // function handle delete row select
    const handleDelete = () => {
        selectedFlatRows.forEach((row) => {
            console.log(row.original);
        });
        toggleAllRowsSelected(false);
    };

    // no render if no raw selected
    if (!selectedFlatRows?.length) {
        return null;
    }

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
