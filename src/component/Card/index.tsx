import { Box, BoxProps } from "@chakra-ui/react";
import { COLOR } from "config";

const Card = ({ children, ...props }: BoxProps) => {
    return (
        <Box
            width="max-content"
            rounded="sm"
            bg="white"
            boxShadow={COLOR.shadowCard}
            p="4"
            userSelect="none"
            {...props}
        >
            {children}
        </Box>
    );
};

export default Card;
