import { MoonIcon } from "@chakra-ui/icons";
import { Box, BoxProps, HStack, useDisclosure } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import PageHeading from "component/page-heading";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MEDIA_QUERY, MEDIA_QUERY_STRING, TITLE } from "../../config";
import Menu from "./Menu";

interface Props {
    open: boolean;
}
const SideBarContainer = styled(Box)<Props & BoxProps>`
    background: white;
    width: 100vw;
    position: fixed;
    height: 100vh;
    overflow: auto;
    z-index: 999;
    display: ${(props) => (props.open ? "initial" : "none")};

    ${MEDIA_QUERY.md} {
        display: initial;
        width: 18rem;
    }
`;

const SideBar = React.memo(() => {
    const navigate = useNavigate();
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
    const [isLargerMd] = useMediaQuery(MEDIA_QUERY_STRING.md);

    useEffect(() => {
        if (isLargerMd) {
            onOpen();
        } else {
            onOpen();
        }
    }, [isLargerMd, onOpen, onClose]);

    return (
        <SideBarContainer open={isOpen}>
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
