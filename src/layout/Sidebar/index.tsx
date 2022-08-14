import { MoonIcon } from "@chakra-ui/icons";
import { Box, BoxProps, HStack, Icon } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import PageHeading from "component/page-heading";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { MEDIA_QUERY, MEDIA_QUERY_STRING, STYLE, TITLE } from "../../config";
import Menu from "./Menu";

// icon only appear in mobile mode | media-query < medium
const MobileCloseSidebarIcon = styled(Icon)`
    font-size: 1.8rem;
    color: ${STYLE.primaryColor};
    cursor: pointer;

    ${MEDIA_QUERY.md} {
        font-size: 2rem;
        display: none;
    }
`;

interface SideBarContainerProps extends BoxProps {
    isOpen: boolean;
}
const SideBarContainer = styled(Box, { shouldForwardProp })<SideBarContainerProps>`
    background: white;
    width: 100vw;
    position: fixed;
    height: 100vh;
    overflow: auto;
    z-index: 999;
    display: ${(props) => (props.isOpen ? "initial" : "none")};

    ${MEDIA_QUERY.md} {
        display: initial;
        width: 18rem;
    }
`;

interface SideBarProp {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}
const SideBar = React.memo(({ isOpen, onClose, onOpen }: SideBarProp) => {
    const navigate = useNavigate();

    const [screenLargerThanMedium] = useMediaQuery(MEDIA_QUERY_STRING.md);

    useEffect(() => {
        // auto show sidebar when screen resize larger than medium screen
        if (screenLargerThanMedium) {
            onOpen();
        } else {
            // auto hide sidebar when screen resize less than medium screen
            onClose();
        }
    }, [screenLargerThanMedium, onOpen, onClose]);

    return (
        <SideBarContainer isOpen={isOpen}>
            {/* // Logo + Brand */}
            <HStack p={{ base: "1rem", md: "1rem 2rem" }} alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                    <MoonIcon cursor="pointer" w={8} h={8} onClick={() => navigate("/")} />
                    <PageHeading>{TITLE}</PageHeading>
                </HStack>
                <MobileCloseSidebarIcon as={FaTimes} onClick={onClose} />
            </HStack>

            {/* List Menu Item */}
            <Menu onClose={onClose} />
        </SideBarContainer>
    );
});

export default SideBar;
