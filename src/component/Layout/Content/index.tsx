import { Box } from "@chakra-ui/react";

import Header from "../Header";

const Content = ({ children }: any) => {
    return (
        <Box ml="60" p={4} flex={1} display="flex" flexDir="column">
            <Header />
            <Box mt="5.5rem" height="100%">
                {children}
            </Box>
        </Box>
    );
};

export default Content;
