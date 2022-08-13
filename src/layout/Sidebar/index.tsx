import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import PageHeading from "component/page-heading";
import React from "react";
import { useNavigate } from "react-router-dom";

import { MEDIA_QUERY, TITLE } from "../../config";
import Menu from "./Menu";

const SideBarContainer = styled(Box)`
    background: white;
    width: 18rem;
    position: fixed;
    height: 100vh;
    overflow: auto;
    display: none;

    ${MEDIA_QUERY.md} {
        display: flex;
    }
`;

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    return (
        <SideBarContainer>
            {/* // Logo + Brand */}
            <HStack p="2rem" alignItems="center">
                <MoonIcon cursor="pointer" w={8} h={8} onClick={() => navigate("/")} />
                <PageHeading>{TITLE}</PageHeading>
            </HStack>

            {/* List Menu Item */}
            <Menu />
        </SideBarContainer>
    );
});

export default SideBar;
