import { ChakraProvider, Spinner, theme } from "@chakra-ui/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import Router from "./router";

export const App = () => (
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
        </Suspense>
    </Provider>
);
