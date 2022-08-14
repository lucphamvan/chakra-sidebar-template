import { Box, Icon, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FaAlignLeft } from "react-icons/fa";

import { MEDIA_QUERY, STYLE } from "../../config";
import Menu from "./menu";

// Phần bao bọc trên cùng, trùng màu background, che cho header
const Wrapper = styled(chakra.header)`
    min-height: 4rem;
    height: 4rem;
    width: 100%;
    background: ${STYLE.background};
    padding: 1rem;
    align-items: center;

    position: fixed;
    right: 0;
    top: 0;
    z-index: 99;

    ${MEDIA_QUERY.md} {
        width: calc(100% - 18rem);
        padding: 1rem 2rem;
    }
`;

// Phần header container màu trắng
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
    gap: 1rem;
    justify-content: space-between;
`;

// icon only appear in mobile mode | media-query < medium
const MobileMenuIcon = styled(Icon)`
    font-size: 1.5rem;
    color: ${STYLE.primaryColor};
    cursor: pointer;

    ${MEDIA_QUERY.md} {
        font-size: 2rem;
        display: none;
    }
`;

interface HeaderProp {
    onToggle: () => void;
}
const Header = ({ onToggle }: HeaderProp) => {
    return (
        <Wrapper>
            <HeaderWrapper>
                <Box>
                    <MobileMenuIcon as={FaAlignLeft} onClick={onToggle} />
                </Box>
                <Menu />
            </HeaderWrapper>
        </Wrapper>
    );
};

export default Header;
