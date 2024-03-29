import { Avatar, Box, Menu as ChakraMenu, HStack, MenuButton, MenuItem, MenuList, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { FiLogOut as LogOut, FiSettings as Settings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { logout } from "redux/slices/authenSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

const StyledMenuList = styled(MenuList)`
    border: none;
    box-shadow: ${STYLE.shadowCard};
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
                        bg={STYLE.primaryColor}
                        name={user?.name}
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
