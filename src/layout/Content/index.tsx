import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MEDIA_QUERY } from "config";
import { FC } from "react";

import Header from "../Header";

const Flex = styled(Box)`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    ${MEDIA_QUERY.md} {
        padding: 1rem 2rem;
        margin-left: 18rem;
    }
`;

interface ContentProp {
    onToggle: () => void;
}
const Content: FC<ContentProp> = ({ children, onToggle }) => {
    return (
        <Flex>
            <Header onToggle={onToggle} />
            <Box mt="5.5rem" height="100%">
                {children}
            </Box>
        </Flex>
    );
};

export default Content;
