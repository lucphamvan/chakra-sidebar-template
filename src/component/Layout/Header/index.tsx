import { chakra, HStack, Box, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { LogOut, Settings } from "react-feather";
import { logout } from "redux/slices/authenSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { Color } from "../../../config";

const Wrapper = styled(chakra.header)`
    min-height: 4rem;
    height: 4rem;
    background: #f1f1f1;
    padding: 1rem;
    align-items: center;
    position: fixed;
    width: calc(100% - 15rem);
    margin-left: -1rem;
    margin-top: -1rem;
    z-index: 99;
`;

const HeaderWrapper = styled(chakra.header)`
    min-height: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.125rem;
    background: ${Color.background};
    box-shadow: 10px 4px 24px 0 ${Color.boxShadow};
    align-items: center;
    background: #fff;
    display: flex;
    justify-content: flex-end;
`;

const StyledMenuList = styled(MenuList)`
    border: none;
    box-shadow: 0px 0px 14px 0 ${Color.cardShadow};
    padding: 1rem 0;
    border-radius: 0.125rem;
`;

const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authen);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Wrapper>
            <HeaderWrapper>
                <HStack>
                    <Menu>
                        <MenuButton>
                            <HStack spacing={4}>
                                <Box className="special-font" fontWeight="bold" textTransform={"uppercase"}>
                                    {user?.name}
                                </Box>
                                <Avatar
                                    name={user?.name}
                                    bg={Color.primary}
                                    size="sm"
                                    color="white"
                                    className="special-font"
                                />
                            </HStack>
                        </MenuButton>
                        <StyledMenuList width={"max-content"}>
                            <MenuItem>
                                <HStack spacing="2" padding="0 0.5rem">
                                    <Settings size={"18"} />
                                    <chakra.span fontSize="1rem">Setting</chakra.span>
                                </HStack>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <HStack spacing="2" padding="0 0.5rem">
                                    <LogOut size={"18"} />
                                    <chakra.span fontSize="1rem">Log out</chakra.span>
                                </HStack>
                            </MenuItem>
                        </StyledMenuList>
                    </Menu>
                </HStack>
            </HeaderWrapper>
        </Wrapper>
    );
};

export default Header;
