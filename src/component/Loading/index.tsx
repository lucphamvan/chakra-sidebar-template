import { Spinner, StackProps, VStack } from "@chakra-ui/react";
import { STYLE } from "config";

const Loading = ({ ...props }: StackProps) => {
    return (
        <VStack justifyContent="center" alignItems="center" {...props}>
            <Spinner
                width={40}
                height={40}
                thickness="8px"
                speed="0.45s"
                emptyColor="gray.200"
                color={STYLE.primaryColor}
            />
        </VStack>
    );
};

export default Loading;
