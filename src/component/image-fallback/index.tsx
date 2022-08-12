import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";

const ImageFallback = styled(Box)`
    width: 100%;
    aspect-ratio: 5/3;
    background-color: ${(props) => props.bg ?? STYLE.textColor};
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default ImageFallback;
