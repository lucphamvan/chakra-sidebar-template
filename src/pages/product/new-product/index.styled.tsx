import { Box, IconButtonProps, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import IconButton from "component/IconButton";
import { MdCheck, MdClose } from "react-icons/md";

const StyledCloseIcon = styled(IconButton)`
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 2rem;
    height: 2rem;
    border-radius: 100% !important;
    background-color: rgba(10, 10, 10, 0.5);
    &:hover {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.7);
    }
    &:active {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.7);
    }
`;

const StyledPrimaryIcon = styled(IconButton)`
    position: absolute;
    min-width: 2rem;
    height: 2rem;
    border-radius: 100% !important;
    background-color: rgba(10, 10, 10, 0.5);
    visibility: hidden; // default hide it
    &:hover {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.7);
    }
    &:active {
        border-radius: 100% !important;
        background-color: rgba(10, 10, 10, 0.7);
    }
`;

export const CloseBtn = ({ ...props }: IconButtonProps) => {
    return (
        <StyledCloseIcon
            className="primary-img-btn"
            fontSize={16}
            variant="ghost"
            icon={<MdClose strokeWidth={2} color="#ffbcbc" />}
            {...props}
        />
    );
};

export const PrimaryBtn = ({ ...props }: IconButtonProps) => {
    return (
        <Tooltip label="This image will be avatar of product" placement="top" hasArrow>
            <StyledPrimaryIcon
                className="primary-img-btn" // important to visible when hover in parent
                fontSize={16}
                variant="ghost"
                icon={<MdCheck strokeWidth={2} color="#01ff95" />}
                {...props}
            />
        </Tooltip>
    );
};

export const ImgBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    // visible child component when hover
    &:hover .primary-img-btn {
        visibility: visible !important;
    }
`;
