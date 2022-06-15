import { chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Color } from "../../config";

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
`;

const Header = () => {
    return (
        <Wrapper>
            <HeaderWrapper></HeaderWrapper>
        </Wrapper>
    );
};

export default Header;
