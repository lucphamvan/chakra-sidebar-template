import { Box } from "@chakra-ui/react";
import Header from "./Header";

const Content = ({ children }: any) => {
    return (
        <Box ml="60" p={4}>
            <Header />
            <Box mt="5.5rem">{children}</Box>
        </Box>
    );
};

export default Content;
