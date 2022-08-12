import { PopoverContent as ChakraContent } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";

export { Popover, PopoverTrigger, PopoverBody, PopoverAnchor, PopoverArrow } from "@chakra-ui/react";

export const PopoverContent = styled(ChakraContent)`
    border: none;
    border-radius: ${STYLE.borderRadius};
    box-shadow: 0 5px 50px -12px rgba(0, 0, 0, 0.25);
`;
