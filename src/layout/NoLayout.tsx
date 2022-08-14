import Loading from "component/loading";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";

const NoLayout = () => {
    const { isAuthen, fetching } = useAppSelector((state) => state.authen);

    if (fetching) {
        return <Loading w="100vw" h="100vh" />;
    }

    if (!isAuthen) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default NoLayout;
