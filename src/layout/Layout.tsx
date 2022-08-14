import { Box, useDisclosure } from "@chakra-ui/react";
import Loading from "component/loading";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";

import Content from "./Content";
import SideBar from "./Sidebar";

const Layout = () => {
    const { isAuthen, fetching } = useAppSelector((state) => state.authen);
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
    if (fetching) {
        return <Loading w="100vw" h="100vh" />;
    }

    if (!isAuthen) {
        return <Navigate to={"/login"} replace />;
    }

    return (
        <Box height="100%" display="flex" flexDir="column">
            <SideBar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            <Content onToggle={onToggle}>
                <Outlet />
            </Content>
        </Box>
    );
};

export default Layout;
