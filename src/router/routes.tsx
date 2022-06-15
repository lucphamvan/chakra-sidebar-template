import { RouteProp } from "type";
import { lazy } from "react";

const PageOne = lazy(() => import("pages/PageOne"));
const PageTwo = lazy(() => import("pages/PageTwo"));
const PageHome = lazy(() => import("pages/Home"));
const PageNotFound = lazy(() => import("pages/NotFound"));

export const routes: RouteProp[] = [
    {
        path: "/",
        element: <PageHome />,
    },
    {
        path: "/one",
        element: <PageOne />,
    },
    {
        path: "/two",
        element: <PageTwo />,
    },
];

export const noLayoutRoutes: RouteProp[] = [
    {
        path: "*",
        element: <PageNotFound />,
    },
];

export default routes;
