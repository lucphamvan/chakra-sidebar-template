import { Routes, Route } from "react-router-dom";
import Layout from "component/Layout/Layout";
import { routes, noLayoutRoutes } from "./routes";
import useAuthen from "hook/authen.hook";

const Router = () => {
    useAuthen();
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                {routes.map((route, index) => {
                    return <Route key={`rl-${index}`} path={route.path} element={route.element} />;
                })}
            </Route>

            {noLayoutRoutes.map((route, index) => {
                return <Route key={`rnl-${index}`} path={route.path} element={route.element} />;
            })}
        </Routes>
    );
};

export default Router;