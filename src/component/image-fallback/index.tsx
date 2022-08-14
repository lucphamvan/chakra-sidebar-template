import { Box, BoxProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { STYLE } from "config";

interface Props extends BoxProps {
    defaultAspect?: boolean;
}

const ImageFallback = styled(Box, { shouldForwardProp })<Props>`
    width: ${(props) => props.width ?? "100%"};
    aspect-ratio: ${(props) => (props.defaultAspect ? 1 : 5 / 3)};
    background-color: ${(props) => props.bg ?? STYLE.textColor};
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default ImageFallback;
