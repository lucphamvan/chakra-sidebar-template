import { Box, BoxProps } from "@chakra-ui/react";

const Card = ({ children, ...props }: BoxProps) => {
    return (
        <Box
            width="max-content"
            rounded="sm"
            bg="white"
            // boxShadow={STYLE.shadowCard}
            p="4"
            userSelect="none"
            {...props}
        >
            {children}
        </Box>
    );
};

export default Card;
