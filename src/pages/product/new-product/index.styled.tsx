import { IconButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import IconButton from "component/IconButton";
import { MdClose } from "react-icons/md";

const StyledIcon = styled(IconButton)`
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 2rem;
    height: 2rem;
    border-radius: 100% !important;
    background-color: rgba(10, 10, 10, 0.4);

    &:hover {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.5);
    }
    &:active {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.5);
    }
`;

export const CloseIcon = ({ ...props }: IconButtonProps) => {
    return <StyledIcon fontSize={16} icon={<MdClose strokeWidth={2} color="white" />} {...props} />;
};
