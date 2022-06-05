import { ChakraProvider, theme } from "@chakra-ui/react";
import Routers from "./router/router";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routers />
    </ChakraProvider>
);
