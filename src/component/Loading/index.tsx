import { Spinner, StackProps, VStack } from "@chakra-ui/react";
import { Color } from "config";

const Loading = ({ ...props }: StackProps) => {
    return (
        <VStack justifyContent="center" alignItems="center" {...props}>
            <Spinner width={40} height={40} thickness="6px" speed="0.65s" emptyColor="gray.200" color={Color.primary} />
        </VStack>
    );
};

export default Loading;
