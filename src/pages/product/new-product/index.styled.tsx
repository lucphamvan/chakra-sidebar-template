import { Grid as ChakraGrid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MEDIA_QUERY } from "config";

export const Grid = styled(ChakraGrid)`
    grid-template-columns: 1fr;
    ${MEDIA_QUERY.lg} {
        grid-template-columns: 1fr 2px 2fr;
    }
`;
