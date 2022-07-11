import { lazy } from "react";
import { RouteProp } from "type";

const SettingPage = lazy(() => import("pages/setting"));
const UserPage = lazy(() => import("pages/UserPage"));
const HomePage = lazy(() => import("pages/Home"));
const NotFoundPage = lazy(() => import("pages/NotFound"));
const LoginPage = lazy(() => import("pages/login"));
const SignupPage = lazy(() => import("pages/sign-up"));
const ProductPage = lazy(() => import("pages/product"));
const NewProductPage = lazy(() => import("pages/product/new-product"));
const FilePage = lazy(() => import("pages/file"));

export const authLayoutRoutes: RouteProp[] = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/setting",
        element: <SettingPage />
    },
    {
        path: "/users",
        element: <UserPage />
    },
    {
        path: "/products/new",
        element: <NewProductPage />
    },
    {
        path: "/products",
        element: <ProductPage />
    },
    {
        path: "/files",
        element: <FilePage />
    }
];

export const authNoLayoutRoutes: RouteProp[] = [];

export const noLayoutRoutes: RouteProp[] = [
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/sign-up",
        element: <SignupPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
];

export default authLayoutRoutes;
