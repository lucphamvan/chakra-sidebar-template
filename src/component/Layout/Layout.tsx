import { Box } from "@chakra-ui/react";
import { Color } from "../../config";
import Content from "./Content";
import SideBar from "./Sidebar";

const Layout = ({ children }: any) => {
    return (
        <Box minH="100vh" bg={Color.background}>
            <SideBar />
            <Content>{children}</Content>
        </Box>
    );
};

export default Layout;
