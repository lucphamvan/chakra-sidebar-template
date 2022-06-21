import { RouteProp } from "type";
import { lazy } from "react";

const SettingPage = lazy(() => import("pages/SettingPage"));
const UserPage = lazy(() => import("pages/UserPage"));
const HomePage = lazy(() => import("pages/Home"));
const NotFoundPage = lazy(() => import("pages/NotFound"));
const LoginPage = lazy(() => import("pages/Login"));
const SignupPage = lazy(() => import("pages/sign-up"));

export const routes: RouteProp[] = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/setting",
        element: <SettingPage />,
    },
    {
        path: "/users",
        element: <UserPage />,
    },
];

export const noLayoutRoutes: RouteProp[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/sign-up",
        element: <SignupPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
