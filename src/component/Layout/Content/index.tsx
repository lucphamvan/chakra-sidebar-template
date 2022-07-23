import { Box } from "@chakra-ui/react";

import Header from "../Header";

const Content = ({ children }: any) => {
    return (
        <Box ml="72" py={4} px={8} flex={1} display="flex" flexDir="column" position="relative">
            <Header />
            <Box mt="5.5rem" height="100%">
                {children}
            </Box>
        </Box>
    );
};

export default Content;
