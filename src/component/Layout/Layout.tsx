import { Box } from "@chakra-ui/react";
import Loading from "core/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { Color } from "../../config";
import Content from "./Content";
import SideBar from "./Sidebar";

const Layout = () => {
    const { isAuthen, fetching } = useAppSelector((state) => state.authen);

    if (fetching) {
        return <Loading w="100vw" h="100vh" />;
    }

    if (!isAuthen) {
        return <Navigate to={"/login"} replace />;
    }

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
