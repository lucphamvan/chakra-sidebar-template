import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Color } from "../../config";
import Content from "./Content";
import SideBar from "./Sidebar";

const Layout = () => {
    return (
        <Box minH="100vh" bg={Color.background}>
            <SideBar />
            <Content>
                <Outlet />
            </Content>
        </Box>
    );
};

export default Layout;
