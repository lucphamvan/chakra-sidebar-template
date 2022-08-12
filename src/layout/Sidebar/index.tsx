import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/react";
import PageHeading from "component/page-heading";
import React from "react";
import { useNavigate } from "react-router-dom";

import { TITLE } from "../../config";
import Menu from "./Menu";

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    return (
        <Box bg="white" w="72" pos="fixed" h="100vh" overflow="auto">
            {/* // Logo + Brand */}
            <HStack p="2rem" alignItems="center">
                <MoonIcon cursor="pointer" w={8} h={8} onClick={() => navigate("/")} />
                <PageHeading>{TITLE}</PageHeading>
            </HStack>

            {/* List Menu Item */}
            <Menu />
        </Box>
    );
});

export default SideBar;
