import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon } from "@chakra-ui/react";
import { COLOR } from "config";
import { FaCheckCircle } from "react-icons/fa";

interface ToastProp {
    title: string;
    onClose: React.MouseEventHandler<SVGElement> | undefined;
    bg: string;
}
const Toast = ({ title, onClose, bg }: ToastProp) => {
    return (
        <HStack
            bg={bg}
            spacing={2}
            padding="0.75rem 1rem"
            borderRadius="0.125rem"
            position="relative"
            alignItems="center"
            paddingRight="1.5rem"
            boxShadow={`0 0 10px 1px ${COLOR.primaryShadow}`}
        >
            <Icon as={FaCheckCircle} color="white" w={"1.125rem"} h={"1.125rem"} />
            <Box color="white" fontWeight={500} fontSize="sm" className="special-font">
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
                color="white"
                cursor="pointer"
            />
        </HStack>
    );
};

export const notifySuccess = (toast: any, title: string) => {
    toast({
        render: (props: any) => <Toast title={title} onClose={props.onClose} bg={COLOR.primary} />,
    });
};

export const notifyError = (toast: any, title: string) => {
    toast({
        render: (props: any) => <Toast title={title} onClose={props.onClose} bg={COLOR.errorColor} />,
    });
};

export const notifyInfo = (toast: any, title: string) => {
    toast({
        status: "info",
        title,
    });
};

export const notifyWarning = (toast: any, title: string) => {
    toast({
        status: "warning",
        title,
    });
};
