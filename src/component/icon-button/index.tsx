import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

const IconButton = styled(ChakraIconButton)`
    &:focus {
        box-shadow: none;
    }
`;

export default IconButton;
