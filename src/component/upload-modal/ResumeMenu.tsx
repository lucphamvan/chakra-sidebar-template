import { Box, Icon as ChakraIcon, Flex, Link, Spinner, chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { STYLE } from "config";
import { FaCheckCircle } from "react-icons/fa";

const Container = styled(Box)`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: ${STYLE.background};
    box-shadow: ${STYLE.shadowCard};
    padding: 1rem 2rem;
    border-radius: ${STYLE.borderRadius};
`;
interface ResumeMenuProp {
    isUploading: boolean;
    numError?: number;
    resumeFunc: () => void;
}

const ResumeMenu = ({ isUploading, numError = 0, resumeFunc }: ResumeMenuProp) => {
    const Icon = isUploading ? (
        <Spinner w="1.5rem" h="1.5rem" color={STYLE.primaryColor} />
    ) : (
        <ChakraIcon as={FaCheckCircle} color={STYLE.primaryColor} w="1.5rem" h="1.5rem" />
    );

    const Text = isUploading ? (
        <Box className="special-font" fontWeight="bold">
            Uploading your files...
        </Box>
    ) : (
        <Box className="special-font" fontWeight="bold">
            Uploaded!{" "}
            <chakra.span className="special-font" color={STYLE.errorColor}>
                {numError} files error
            </chakra.span>
        </Box>
    );

    return (
        <Container>
            <Flex alignItems="center" gap={6}>
                {Icon}
                <Box fontWeight="bold">{Text}</Box>
                <Link
                    onClick={resumeFunc}
                    className="special-font"
                    cursor="pointer"
                    fontWeight="bold"
                    color={STYLE.primaryColor}
                >
                    Detail
                </Link>
            </Flex>
        </Container>
    );
};
export default ResumeMenu;
