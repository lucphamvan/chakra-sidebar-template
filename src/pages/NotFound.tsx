import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Color } from "config";
import { NavLink } from "react-router-dom";

export default function PageHome() {
    return (
        <VStack h="100vh" justifyContent="center">
            <HStack spacing="6" justifyContent="center">
                <Heading>404</Heading>
                <Box w={1} h={10} bg="gray.600" />
                <Text>This page could not be found</Text>
            </HStack>
            <NavLink to="/">
                <Heading color={Color.primary} textDecor="underline">
                    Go Home
                </Heading>
            </NavLink>
        </VStack>
    );
}
