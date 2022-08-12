import { SearchIcon } from "@chakra-ui/icons";
import { Box, HStack, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import { DataTable } from "component/data-table";
import PageHeading from "component/page-heading";
import UploadModal from "component/upload-modal";
import { TABLE_HEIGHT } from "config";
import { File } from "model/File";
import { useCallback, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { SortingRule } from "react-table";
import fileService from "services/file.service";

import { generateColumn } from "./column";
import { buildOrderByQuery } from "./helper";
import MultipleMenu from "./multiple-menu";

const FilePage = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [files, setFiles] = useState<File[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);

    const getFiles = useCallback(async (pageIndex: number, pageSize: number, orderBy: SortingRule<File>[]) => {
        const orderQuery = buildOrderByQuery(orderBy);

        const response = await fileService.getFiles({ page: pageIndex, limit: pageSize, orderBy: orderQuery });
        const totalPage = Math.ceil(response.data.count / pageSize);

        setFiles(response.data.items);
        setTotalPage(totalPage);
    }, []);

    const toggleRefresh = () => {
        setIsRefresh((value) => !value);
    };

    const multipleMenu = (selectedFlatRows: any, toggleAllRowsSelected: any) => {
        return (
            <MultipleMenu
                selectedFlatRows={selectedFlatRows}
                toggleAllRowsSelected={toggleAllRowsSelected}
                reload={toggleRefresh}
            />
        );
    };

    return (
        <>
            <PageHeading>File Managment</PageHeading>
            <Card w="100%" p={0} mt={4}>
                <HStack p={4} justifyContent="flex-end" spacing={4}>
                    <InputGroup w="60">
                        <InputLeftElement children={<SearchIcon />} />
                        <Input placeholder="Search" type="search" />
                    </InputGroup>

                    <Button leftIcon={<MdFileUpload />} onClick={onToggle}>
                        Upload File
                    </Button>
                </HStack>
                <Box h={TABLE_HEIGHT} display="flex" flexDir="column" overflow="auto">
                    <DataTable
                        isRefresh={isRefresh}
                        data={files}
                        columns={generateColumn(toggleRefresh)}
                        getData={getFiles}
                        totalPage={totalPage}
                        multipleMenu={multipleMenu}
                    />
                </Box>
                <UploadModal reload={toggleRefresh} isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
            </Card>
        </>
    );
};

export default FilePage;
