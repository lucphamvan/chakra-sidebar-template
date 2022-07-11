import Layout from "component/Layout/Layout";
import NoLayout from "component/Layout/NoLayout";
import useAuthen from "hook/authen.hook";
import { Route, Routes } from "react-router-dom";

import { authLayoutRoutes, authNoLayoutRoutes, noLayoutRoutes } from "./routes";

const Router = () => {
    useAuthen();
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                {authLayoutRoutes.map((route, index) => {
                    return <Route key={`rl-${index}`} path={route.path} element={route.element} />;
                })}
            </Route>

            <Route path="" element={<NoLayout />}>
                {authNoLayoutRoutes.map((route, index) => {
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
