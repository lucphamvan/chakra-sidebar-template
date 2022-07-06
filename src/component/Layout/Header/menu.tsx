import { MenuButton, HStack, Avatar, MenuItem, chakra, Menu as ChakraMenu, Box, MenuList } from "@chakra-ui/react";
import { Color } from "config";
import { Settings, LogOut } from "react-feather";
import { logout } from "redux/slices/authenSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const StyledMenuList = styled(MenuList)`
    border: none;
    box-shadow: 0px 0px 14px 0 ${Color.cardShadow};
    padding: 1rem 0;
    border-radius: 0.125rem;
`;

const Menu = () => {
    const { user } = useAppSelector((state) => state.authen);

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ChakraMenu>
            <MenuButton>
                <HStack spacing={4}>
                    <Box className="special-font" fontWeight="bold" textTransform={"uppercase"}>
                        {user?.name}
                    </Box>
                    <Avatar
                        name={user?.name}
                        backgroundColor="primary"
                        size="sm"
                        color="white"
                        className="special-font"
                    />
                </HStack>
            </MenuButton>
            <StyledMenuList width={"max-content"}>
                <NavLink to={"/setting"}>
                    <MenuItem>
                        <HStack spacing="2" padding="0 0.5rem">
                            <Settings size={"18"} />
                            <chakra.span fontSize="1rem">Setting</chakra.span>
                        </HStack>
                    </MenuItem>
                </NavLink>
                <MenuItem onClick={handleLogout}>
                    <HStack spacing="2" padding="0 0.5rem">
                        <LogOut size={"18"} />
                        <chakra.span fontSize="1rem">Log out</chakra.span>
                    </HStack>
                </MenuItem>
            </StyledMenuList>
        </ChakraMenu>
    );
};

export default Menu;
