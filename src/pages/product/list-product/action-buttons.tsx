import { Box, HStack, Tooltip, chakra, useToast } from "@chakra-ui/react";
import IconButton from "component/IconButton";
import { notifyError, notifySuccess } from "component/Toast";
import { STYLE } from "config";
import useModals from "context/modal-provider";
import { Product } from "model/Product";
import { MdDelete, MdEdit } from "react-icons/md";
import productService from "services/product.service";

interface Props {
    product: Product;
    reload?: () => void;
}

const ActionButtons = ({ product, reload }: Props) => {
    const { confirm } = useModals();
    const toast = useToast({ duration: 3000, position: "top-right" });

    // delete message confirm modal
    const deleteModalMessage = (
        <Box>
            Are you sure to delete{" "}
            <chakra.span color={STYLE.errorColor} fontWeight={600}>
                {product.name}
            </chakra.span>{" "}
            ?
        </Box>
    );

    const deleteSuccessMessage = (
        <Box>
            Delete product <chakra.span fontWeight="bold">{product.name}</chakra.span> successfull
        </Box>
    );

    const deleteFailedMessage = (
        <Box>
            Delete product <chakra.span fontWeight="bold">{product.name}</chakra.span> failed
        </Box>
    );

    const onDelete = async () => {
        try {
            const ok = await confirm(deleteModalMessage);
            if (ok) {
                await productService.delete(product);
                reload && reload();
                notifySuccess(toast, deleteSuccessMessage);
            }
        } catch (error: any) {
            console.log(`failed to delete product ${product.name}`, error.message);
            notifyError(toast, deleteFailedMessage);
        }
    };

    const onEdit = () => {};

    return (
        <HStack spacing={0} padding={0}>
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
