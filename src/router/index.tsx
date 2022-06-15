import { Routes, Route } from "react-router-dom";
import Layout from "component/Layout/Layout";
import { routes, noLayoutRoutes } from "./routes";

const Router = () => {
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                {routes.map((route, index) => {
                    return <Route key={`route-layout-${index}`} path={route.path} element={route.element} />;
                })}
            </Route>

            {noLayoutRoutes.map((route, index) => {
                return <Route key={`route-nolayout-${index}`} path={route.path} element={route.element} />;
            })}
        </Routes>
    );
};

export default Router;
