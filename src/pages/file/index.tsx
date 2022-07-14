import { Box, HStack, useDisclosure } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import { DataTable } from "component/data-table";
import PageHeading from "component/page-heading";
import UploadModal from "component/upload-modal";
import { File } from "model/File";
import { useCallback, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { SortingRule } from "react-table";
import fileService from "services/file.service";

import { columns } from "./column";
import { buildOrderByQuery } from "./helper";

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

    return (
        <>
            <PageHeading>File Managment</PageHeading>
            <Card w="100%" px={0} mt={4}>
                <HStack p={4} mb={4} justifyContent="space-between">
                    <Button leftIcon={<MdFileUpload />} onClick={onToggle}>
                        Upload
                    </Button>
                </HStack>
                <Box h="41rem" display="flex" flexDir="column" overflow="auto">
                    <DataTable
                        isRefresh={isRefresh}
                        data={files}
                        columns={columns}
                        getData={getFiles}
                        totalPage={totalPage}
                    />
                </Box>
                <UploadModal reload={toggleRefresh} isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
            </Card>
        </>
    );
};

export default FilePage;
