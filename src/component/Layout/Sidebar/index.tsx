import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { STYLE, TITLE } from "../../../config";
import Menu from "./Menu";

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    return (
        <Box bg="white" w="72" pos="fixed" h="100vh" overflow="auto" boxShadow={STYLE.shadowCard}>
            {/* // Logo + Brand */}
            <HStack p="1.5rem 1rem">
                <MoonIcon cursor="pointer" color="#39424E" w="8" h="8" onClick={() => navigate("/")} />
                <Heading className="special-font" fontSize="2xl" color="#39424E">
                    {TITLE}
                </Heading>
            </HStack>

            {/* List Menu Item */}
            <Menu />
        </Box>
    );
});

export default SideBar;
