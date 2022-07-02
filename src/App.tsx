import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import Router from "./router";
import "styles/index.scss";
import Loading from "component/Loading";

console.log("hello every body");
const theme = extendTheme({
    colors: {
        primary: {
            50: "#e1fdf0",
            100: "#b9f5d8",
            200: "#90edbd",
            300: "#65e69f",
            400: "#3cdf7e",
            500: "#24c65f",
            600: "#1BA94C",
            700: "#0f6e37",
            800: "#044224",
            900: "#001809",
        },
    },
});

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <Suspense fallback={<Loading w="100vw" h="100vh" />}>
                <Router />
            </Suspense>
        </ChakraProvider>
    </Provider>
);
