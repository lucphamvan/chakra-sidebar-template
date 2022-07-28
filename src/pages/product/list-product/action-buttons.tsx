import { Box, HStack, Tooltip, chakra, useToast } from "@chakra-ui/react";
import IconButton from "component/IconButton";
import { notifyError, notifySuccess } from "component/Toast";
import { STYLE } from "config";
import usePopup from "context/modal-provider";
import { Product } from "model/Product";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import productService from "services/product.service";

interface Props {
    product: Product;
    reload?: () => void;
}

const ActionButtons = ({ product, reload }: Props) => {
    const { confirm } = usePopup();
    const toast = useToast({ duration: 3000, position: "top-right" });
    const navigate = useNavigate();
    const location = useLocation();

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

    const onView = () => {
        navigate(`/products/${product.id}`, { state: { background: location } });
    };

    const onEdit = () => {
        navigate(`/products/edit/${product.id}`, { state: { background: location } });
    };

    return (
        <HStack spacing={0} padding={0}>
            <Tooltip hasArrow label="Detail" placement="top">
                <IconButton onClick={onView} icon={<FaEye />} variant="ghost" aria-label="view" />
            </Tooltip>
            <Tooltip hasArrow label="Edit" placement="top">
                <IconButton onClick={onEdit} icon={<FaEdit />} variant="ghost" aria-label="edit" />
            </Tooltip>
            <Tooltip hasArrow label="Delete" placement="top">
                <IconButton onClick={onDelete} icon={<MdDelete />} variant="ghost" aria-label="delete" />
            </Tooltip>
        </HStack>
    );
};

export default ActionButtons;
