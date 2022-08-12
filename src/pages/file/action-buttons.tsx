import { Box, HStack, Tooltip, chakra, useToast } from "@chakra-ui/react";
import IconButton from "component/icon-button";
import { notifyError, notifySuccess } from "component/toast";
import { STYLE } from "config";
import usePopup from "context/modal-provider";
import { File } from "model/File";
import { MdDelete, MdEdit, MdFileDownload } from "react-icons/md";
import fileService from "services/file.service";

interface Props {
    file: File;
    reload?: () => void;
}

const ActionButtons = ({ file, reload }: Props) => {
    const { confirm } = usePopup();
    const toast = useToast({ duration: 3000, position: "top-right" });

    const onDownload = async () => {
        try {
            await fileService.download(file);
        } catch (error: any) {
            console.log("error download file", error.message);
        }
    };

    // delete message confirm modal
    const deleteModalMessage = (
        <Box>
            Are you sure to delete{" "}
            <chakra.span color={STYLE.errorColor} fontWeight={600}>
                {file.orginalName}
            </chakra.span>{" "}
            ?
        </Box>
    );

    const deleteSuccessMessage = (
        <Box>
            Delete file <chakra.span fontWeight="bold">{file.orginalName}</chakra.span> successfull
        </Box>
    );

    const deleteFailedMessage = (
        <Box>
            Delete file <chakra.span fontWeight="bold">{file.orginalName}</chakra.span> failed
        </Box>
    );

    const onDelete = async () => {
        try {
            const ok = await confirm(deleteModalMessage);
            if (ok) {
                await fileService.delete(file);
                reload && reload();
                notifySuccess(toast, deleteSuccessMessage);
            }
        } catch (error: any) {
            console.log(`failed to delete file ${file.orginalName}`, error.message);
            notifyError(toast, deleteFailedMessage);
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
