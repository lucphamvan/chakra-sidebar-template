import { Spinner, VStack } from "@chakra-ui/react";

const Loading = ({ ...props }) => {
    return (
        <VStack justifyContent="center" alignItems="center" {...props}>
            <Spinner size="xl" />
        </VStack>
    );
};

export default Loading;
