import { ChakraProvider, theme } from "@chakra-ui/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import Router from "./router";
import "styles/index.scss";
import Loading from "core/Loading";

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <Suspense fallback={<Loading w="100vw" h="100vh" />}>
                <Router />
            </Suspense>
        </ChakraProvider>
    </Provider>
);
