import { Box, IconButtonProps, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import IconButton from "component/icon-button";
import { STYLE } from "config";
import { MdCheck, MdClose } from "react-icons/md";

export const IconWrapper = styled(Box)`
    position: absolute;
    top: 4px;
    right: 4px;
`;

export const MenuIcon = styled(IconButton)`
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

export const MenuItem = styled(Box)`
    cursor: pointer;
    border-radius: ${STYLE.borderRadius};
    padding: 0.25rem 0.5rem;
    font-weight: 600;

    &:hover {
        background-color: rgba(100, 100, 100, 0.2);
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

export const MenuBtn = ({ ...props }: IconButtonProps) => {
    return (
        <MenuIcon
            className="primary-img-btn"
            fontSize={16}
            variant="ghost"
            icon={<MdClose strokeWidth={2} color="#ffffff" />}
            {...props}
        />
    );
};

export const PrimaryBtn = ({ ...props }: IconButtonProps) => {
    return (
        <Tooltip label="This image is avatar of product" placement="top" hasArrow>
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
    flex-direction: column;
    // visible child component when hover
    &:hover .primary-img-btn {
        visibility: visible !important;
    }
`;
