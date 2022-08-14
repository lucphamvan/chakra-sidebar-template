import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MEDIA_QUERY } from "config";

import Header from "../Header";

const Flex = styled(Box)`
    ${MEDIA_QUERY.md} {
        margin-left: 18rem;
    }
    padding: 1rem 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Content = ({ children }: any) => {
    return (
        <Flex>
            <Header />
            <Box mt="5.5rem" height="100%">
                {children}
            </Box>
        </Flex>
    );
};

export default Content;
