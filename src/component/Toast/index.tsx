import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon } from "@chakra-ui/react";
import { STYLE } from "config";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

interface ToastProp {
    title: string;
    onClose: React.MouseEventHandler<SVGElement> | undefined;
    type?: "success" | "error" | "warning" | "info";
    bg: string;
    boxShadow?: string;
    color?: string;
}
const Toast = ({
    title,
    type = "info",
    onClose,
    bg,
    boxShadow = STYLE.shadowCard,
    color = STYLE.primaryColor
}: ToastProp) => {
    let IconToast;
    switch (type) {
        case "success":
            IconToast = FaCheckCircle;
            break;
        case "error":
            IconToast = FaInfoCircle;
            break;
        default:
            IconToast = FaInfoCircle;
            break;
    }

    return (
        <HStack
            bg={bg}
            spacing={4}
            padding="0.75rem 1rem"
            borderRadius="0.125rem"
            position="relative"
            alignItems="center"
            paddingRight="2rem"
            boxShadow={boxShadow}
        >
            <Icon as={IconToast} color={color} w={"1.125rem"} h={"1.125rem"} />
            <Box fontWeight={700} fontSize="sm" color={color} className="special-font">
                {title}
            </Box>
            <Icon
                position="absolute"
                top={1}
                right={1}
                as={SmallCloseIcon}
                onClick={onClose}
                w={"1.125rem"}
                h={"1.125rem"}
                cursor="pointer"
            />
        </HStack>
    );
};

export const notifySuccess = (toast: any, title: string) => {
    toast({
        render: (props: any) => (
            <Toast
                type="success"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowBtn}
                bg={STYLE.secondary}
            />
        )
    });
};

export const notifyError = (toast: any, title: string) => {
    toast({
        render: (props: any) => (
            <Toast
                type="error"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowErr}
                bg={STYLE.secondary}
                color={STYLE.errorColor}
            />
        )
    });
};

export const notifyInfo = (toast: any, title: string) => {
    toast({
        render: (props: any) => (
            <Toast
                type="info"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowInfo}
                bg={STYLE.secondary}
                color={STYLE.infoColor}
            />
        )
    });
};

export const notifyWarning = (toast: any, title: string) => {
    toast({
        status: "warning",
        title
    });
};
