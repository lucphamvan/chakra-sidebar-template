import { Box, Avatar as ChakraAvatar, Image as ChakraImage } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";

export const ItemWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* padding: 1rem; */
    border-radius: 0.25rem;
    cursor: pointer;
    /* background-color: #fff; */
    transition: transform 250ms;
    aspect-ratio: 5/4; // important to keep ratio and specify height based on width
`;

export const Image = styled(ChakraImage)`
    aspect-ratio: 5/3; // important to keep ratio and specify height based on width
    width: 100%;
    object-fit: scale-down;
    user-select: none;
    background: ${STYLE.textColor};
    /* border-radius: 0.25rem; */
    transition: transform 250ms;
`;

export const Avatar = styled(ChakraAvatar)`
    font-weight: 900;
    color: #ffffff;
`;

export const Skeleton = styled(Box)`
    width: 100%;
    aspect-ratio: 5/3;
    background-color: ${STYLE.textColor};
    /* border-radius: 0.25rem; */
    display: flex;
    align-items: center;
    justify-content: center;
`;
