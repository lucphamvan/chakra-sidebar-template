import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading } from "@chakra-ui/react";

import { Color, Title } from "../../config";
import React from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    return (
        <Box bg="white" w="60" pos="fixed" h="100vh" overflow="auto" boxShadow={`0 0 15px 0 ${Color.boxShadow}`}>
            {/* // Logo + Brand */}
            <HStack p="1.5rem 1rem">
                <MoonIcon cursor="pointer" color="#39424E" w="8" h="8" onClick={() => navigate("/")} />
                <Heading className="special-font" fontSize="2xl" color="#39424E">
                    {Title}
                </Heading>
            </HStack>

            {/* List Menu Item */}
            <Menu />
        </Box>
    );
});

export default SideBar;
