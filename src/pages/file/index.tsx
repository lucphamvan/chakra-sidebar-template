import { HStack, useDisclosure } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import PageHeading from "component/page-heading";
import UploadModal from "component/upload-modal";

const FilePage = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    return (
        <>
            <PageHeading>File Managment</PageHeading>
            <Card w="100%" mt={4}>
                <HStack>
                    <Button onClick={onToggle}>Upload File</Button>
                </HStack>
                {/* <DataTable data={} /> */}

                <UploadModal isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
            </Card>
        </>
    );
};

export default FilePage;
