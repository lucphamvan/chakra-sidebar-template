import Layout from "component/Layout/Layout";
import NoLayout from "component/Layout/NoLayout";
import useAuthen from "hook/authen.hook";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { authLayoutRoutes, authNoLayoutRoutes, noLayoutRoutes } from "./routes";

const DetailProductPage = lazy(() => import("pages/product/product-detail"));
const EditProductPage = lazy(() => import("pages/product/product-edit"));

const Router = () => {
    useAuthen();
    const location = useLocation();
    const background = location.state && (location.state as any).background;
    return (
        <>
            <Routes location={background || location}>
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

            {background && (
                <Routes>
                    <Route path="/products/:id" element={<DetailProductPage />} />
                    <Route path="/products/edit/:id" element={<EditProductPage />} />
                </Routes>
            )}
        </>
    );
};

export default Router;
