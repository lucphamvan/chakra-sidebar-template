import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { COLOR } from "config";

const Container = styled(Box)`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
    height: 4rem;
    background: ${COLOR.background};
    box-shadow: ${COLOR.shadowBtn};
`;
const ResumeMenu = () => {
    return <Container></Container>;
};
export default ResumeMenu;
