import { MoonIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, List, ListItem as Item } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import { Color, Title } from "../../config";
import routes from "../../router/routes";

const LinkItem = styled(NavLink)`
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-weight: bold;
    &:hover {
        background-color: #d4d5d5;
        box-shadow: 0 0 10px 1px #dae0dd;
        border-radius: 0.125rem;
    }
    &.active {
        background-color: ${Color.primary};
        box-shadow: 0 0 10px 1px ${Color.primaryShadow};
        color: #fff;
        border-radius: 0.125rem;
    }
`;

const ListItem = styled(Item)`
    padding: 0.25rem 1rem;
`;

const SideBar = () => {
    return (
        <Box bg="white" w="60" pos="fixed" h="100vh" overflow="auto" boxShadow={`0 0 15px 0 ${Color.boxShadow}`}>
            <HStack p="1.5rem 1rem">
                <MoonIcon color={Color.primary} w="8" h="8" />
                <Heading fontSize="2xl" color={Color.primary}>
                    {Title}
                </Heading>
            </HStack>
            <List>
                {routes.map((route, index) => {
                    return (
                        <ListItem key={`listItem-${index}`}>
                            <LinkItem to={route.path}>{route.navText}</LinkItem>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default SideBar;
