import { Box } from "@chakra-ui/react";
import Header from "./Header";

const Content = ({ children }: any) => {
    return (
        <Box ml="60" p={4}>
            <Header />
            {children}
        </Box>
    );
};

export default Content;
