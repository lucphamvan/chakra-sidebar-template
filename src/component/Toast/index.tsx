import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon } from "@chakra-ui/react";
import { STYLE } from "config";
import React from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

interface ToastProp {
    title: string | JSX.Element | React.ReactNode;
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
            padding="0.875rem 1rem"
            borderRadius="0.125rem"
            position="relative"
            alignItems="center"
            paddingRight="2rem"
            boxShadow={boxShadow}
        >
            <Icon as={IconToast} color={color} w={"1.25rem"} h={"1.25rem"} />
            <Box fontWeight={600} color={color}>
                {title}
            </Box>
            <Icon
                position="absolute"
                top={1}
                right={1}
                color={color}
                as={SmallCloseIcon}
                onClick={onClose}
                w={"1.25rem"}
                h={"1.25rem"}
                cursor="pointer"
            />
        </HStack>
    );
};

export const notifySuccess = (toast: any, title: string | JSX.Element | React.ReactNode) => {
    toast({
        render: (props: any) => (
            <Toast
                type="success"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowBtn}
                bg={STYLE.bgSuccess}
            />
        )
    });
};

export const notifyError = (toast: any, title: string | JSX.Element | React.ReactNode) => {
    toast({
        render: (props: any) => (
            <Toast
                type="error"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowErr}
                bg={STYLE.bgError}
                color={STYLE.errorColor}
            />
        )
    });
};

export const notifyInfo = (toast: any, title: string | JSX.Element | React.ReactNode) => {
    toast({
        render: (props: any) => (
            <Toast
                type="info"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowInfo}
                bg={STYLE.bgInfo}
                color={STYLE.infoColor}
            />
        )
    });
};

export const notifyWarning = (toast: any, title: string | JSX.Element | React.ReactNode) => {
    toast({
        render: (props: any) => (
            <Toast
                type="warning"
                title={title}
                onClose={props.onClose}
                boxShadow={STYLE.shadowWarning}
                bg={STYLE.bgWarning}
                color={STYLE.warningColor}
            />
        )
    });
};
