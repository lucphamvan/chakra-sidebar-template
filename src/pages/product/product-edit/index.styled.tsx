import { Grid as ChakraGrid } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Grid = styled(ChakraGrid)`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
`;
