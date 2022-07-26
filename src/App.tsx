import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { OverlayContainer } from "@react-aria/overlays";
import "animate.css";
import Loading from "component/Loading";
import { STYLE } from "config";
import { ModalProvider } from "context/modal-provider";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "redux/store";

import "assets/css/index.scss";

import Router from "./router";

const theme = extendTheme({
    colors: {
        "green.primary": {
            50: "#e1fdf0",
            100: "#b9f5d8",
            200: "#90edbd",
            300: "#65e69f",
            400: "#3cdf7e",
            500: "#24c65f",
            600: "#1BA94C",
            700: "#0f6e37",
            800: "#044224",
            900: "#001809"
        },
        primary: {
            50: "#EBF8FF",
            100: "#BEE3F8",
            200: "#90CDF4",
            300: "#698BFF",
            400: "#608BFF",
            500: "#528BFF",
            600: "#318BFF",
            700: "#218BFF",
            800: "#2e649e",
            900: "#1A365D"
        }
    },
    styles: {
        global: {
            "html, body": {
                height: "100%",
                color: "#39424e",
                fontSize: "15px",
                background: STYLE.background
            },
            "#app-root": {
                height: "100%"
            }
        }
    }
});

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <OverlayContainer id="app-root">
                <Suspense fallback={<Loading w="100vw" h="100vh" />}>
                    <ModalProvider>
                        <Router />
                    </ModalProvider>
                </Suspense>
            </OverlayContainer>
        </ChakraProvider>
    </Provider>
);
