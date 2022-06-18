import { Box, BoxProps } from "@chakra-ui/react";

const Card = ({ children, ...props }: BoxProps) => {
    return (
        <Box width="max-content" rounded="sm" bg="white" boxShadow="0 4px 24px 0 rgba(34,41,47,0.1)" p="4" {...props}>
            {children}
        </Box>
    );
};

export default Card;
