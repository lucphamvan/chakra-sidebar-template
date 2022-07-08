import { useDisclosure } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import PageHeading from "component/page-heading";
import UploadModal from "./UploadModal";

const FilePage = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    return (
        <>
            <PageHeading>File Managment</PageHeading>
            <Card w="100%" mt={4}>
                <Button onClick={onToggle}>Upload File</Button>
                <UploadModal isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
            </Card>
        </>
    );
};

export default FilePage;
