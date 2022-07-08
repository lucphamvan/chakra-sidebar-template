import { Box } from "@chakra-ui/react";
import Loading from "component/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { STYLE } from "../../config";
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
        <Box h="100vh" bg={STYLE.background} display="flex" flexDir="column">
            <SideBar />
            <Content>
                <Outlet />
            </Content>
        </Box>
    );
};

export default Layout;
