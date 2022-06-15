import { RouteProp } from "type";
import { lazy } from "react";

const PageOne = lazy(() => import("pages/page-one"));
const PageTwo = lazy(() => import("pages/page-two"));
const PageHome = lazy(() => import("pages/page-home"));
const PageNotFound = lazy(() => import("pages/page-not-found"));

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
