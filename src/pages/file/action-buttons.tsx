import { Box, HStack, Tooltip, chakra } from "@chakra-ui/react";
import IconButton from "component/IconButton";
import { STYLE } from "config";
import useModals from "context/modal-provider";
import { File } from "model/File";
import { MdDelete, MdEdit, MdFileDownload } from "react-icons/md";
import fileService from "services/file.service";

interface Props {
    file: File;
}

const ActionButtons = ({ file }: Props) => {
    const { confirm } = useModals();

    const onDownload = async () => {
        try {
            await fileService.download(file);
        } catch (error: any) {
            console.log("error download file", error.message);
        }
    };

    const onDelete = async () => {
        const message = (
            <Box>
                Are you sure to delete{" "}
                <chakra.span color={STYLE.errorColor} fontWeight={600}>
                    {file.orginalName}
                </chakra.span>{" "}
                ?
            </Box>
        );
        const ok = await confirm(message);
        if (ok) {
            fileService.delete(file);
        }
    };

    const onEdit = () => {};

    return (
        <HStack spacing={0} padding={0}>
            <Tooltip hasArrow label="Download" placement="top">
                <IconButton onClick={onDownload} icon={<MdFileDownload />} variant="ghost" aria-label="download" />
            </Tooltip>
            <Tooltip hasArrow label="Delete" placement="top">
                <IconButton onClick={onDelete} icon={<MdDelete />} variant="ghost" aria-label="delete" />
            </Tooltip>
            <Tooltip hasArrow label="Edit" placement="top">
                <IconButton onClick={onEdit} icon={<MdEdit />} variant="ghost" aria-label="edit" />
            </Tooltip>
        </HStack>
    );
};

export default ActionButtons;
