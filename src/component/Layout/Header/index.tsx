import { HStack, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { STYLE } from "../../../config";
import Menu from "./menu";

const Wrapper = styled(chakra.header)`
    min-height: 4rem;
    height: 4rem;
    background: ${STYLE.background};
    padding: 1rem 2rem;
    align-items: center;
    position: absolute;
    width: calc(100%);
    left: 0;
    top: 0;
    z-index: 99;
`;

const HeaderWrapper = styled(chakra.header)`
    min-height: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.125rem;
    background: ${STYLE.background};
    /* box-shadow: ${STYLE.shadowCard}; */
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
