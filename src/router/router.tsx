import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import { routes, noLayoutRoutes } from "./routes";

const Router = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                return (
                    <Route key={`route-layout-${index}`} path={route.path} element={<Layout>{route.element}</Layout>} />
                );
            })}
            {noLayoutRoutes.map((route, index) => {
                return <Route key={`route-nolayout-${index}`} path={route.path} element={route.element} />;
            })}
        </Routes>
    );
};

export default Router;
