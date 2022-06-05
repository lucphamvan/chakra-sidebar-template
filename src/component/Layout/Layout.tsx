import { Box } from "@chakra-ui/react";
import Content from "./Content";
import SideBar from "./Sidebar";

const Layout = ({ children }: any) => {
    return (
        <Box minH="100vh" bg="#F8F8F8">
            <SideBar />
            <Content>{children}</Content>
        </Box>
    );
};

export default Layout;
