import { Grid as ChakraGrid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MEDIA_QUERY } from "config";

export const Grid = styled(ChakraGrid)`
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr);
    ${MEDIA_QUERY.lg} {
        grid-template-columns: minmax(0, 1fr) 2px minmax(0, 2fr);
    }
`;
