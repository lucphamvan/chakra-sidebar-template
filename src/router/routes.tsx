import PageOne from "../pages/page-one";
import PageTwo from "../pages/page-two";
import PageHome from "../pages/page-home";
import PageNotFound from "../pages/page-not-found";

const routes = [
    {
        path: "/",
        element: <PageHome />,
        navText: "Home",
    },
    {
        path: "/one",
        element: <PageOne />,
        navText: "Page One",
    },
    {
        path: "/two",
        element: <PageTwo />,
        navText: "Page Two",
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
];


export default routes;
