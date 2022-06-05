import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import routes from "./routes";

const Router = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                return <Route key={`router-${index}`} path={route.path} element={<Layout>{route.element}</Layout>} />;
            })}
        </Routes>
    );
};

export default Router;
