import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteProp } from "type";

const SettingPage = lazy(() => import("pages/setting"));
const UserPage = lazy(() => import("pages/UserPage"));
const TestPage = lazy(() => import("pages/TestPage"));
const NotFoundPage = lazy(() => import("pages/NotFound"));

const LoginPage = lazy(() => import("pages/login"));
const SignupPage = lazy(() => import("pages/sign-up"));

const ProductPage = lazy(() => import("pages/product"));
const NewProductPage = lazy(() => import("pages/product/new-product"));
const ManageProductPage = lazy(() => import("pages/product/list-product"));
const DetailProductPage = lazy(() => import("pages/product/product-detail"));
const EditProductPage = lazy(() => import("pages/product/product-edit"));

const PdfPage = lazy(() => import("pages/pdf"));
const FilePage = lazy(() => import("pages/file"));

export const authLayoutRoutes: RouteProp[] = [
    {
        path: "/",
        element: <Navigate to={"/products"} />
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
        path: "/products/manage",
        element: <ManageProductPage />
    },
    {
        path: "/products/edit/:id",
        element: <EditProductPage />
    },
    {
        path: "/products/:id",
        element: <DetailProductPage />
    },
    {
        path: "/products",
        element: <ProductPage />
    },
    {
        path: "/files",
        element: <FilePage />
    },
    {
        path: "/reader",
        element: <PdfPage />
    },
    {
        path: "/test",
        element: <TestPage />
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
