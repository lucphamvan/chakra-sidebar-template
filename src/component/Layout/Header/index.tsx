import { chakra, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { COLOR } from "../../../config";
import Menu from "./menu";

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
    background: ${COLOR.background};
    box-shadow: ${COLOR.shadowCard};
    align-items: center;
    background: #fff;
    display: flex;
    justify-content: flex-end;
`;

const Header = () => {
    return (
        <Wrapper>
            <HeaderWrapper>
                <HStack>
                    <Menu />
                </HStack>
            </HeaderWrapper>
        </Wrapper>
    );
};

export default Header;
