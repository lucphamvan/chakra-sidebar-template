import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { TITLE } from "../../config";
import Menu from "./Menu";

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    return (
        <Box bg="white" w="72" pos="fixed" h="100vh" overflow="auto">
            {/* // Logo + Brand */}
            <HStack p="2rem" justifyContent="center">
                <MoonIcon cursor="pointer" w={6} h={6} onClick={() => navigate("/")} />
                <Heading className="special-font" fontSize="2xl" fontWeight="black" userSelect="none">
                    {TITLE}
                </Heading>
            </HStack>

            {/* List Menu Item */}
            <Menu />
        </Box>
    );
});

export default SideBar;
