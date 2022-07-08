import { WarningIcon } from "@chakra-ui/icons";
import { GridItem, Flex, Progress, IconButton } from "@chakra-ui/react";
import { Fragment } from "react";

const ErrorIcon = () => (
    <IconButton
        aria-label="error"
        fontSize="22px"
        color="red.400"
        cursor="default"
        icon={<WarningIcon />}
        variant="ghost"
        _focus={{ boxShadow: "none" }}
        _hover={{ background: "none" }}
        _active={{ background: "none" }}
    />
);

const ErrorItem = ({ name }: { name: string }) => {
    return (
        <Fragment>
            <GridItem
                alignItems="center"
                className="special-font"
                noOfLines={1}
            >
                {name}
            </GridItem>
            <GridItem alignItems="center">
                <Flex alignItems="center" width="100%" gap={4}>
                    <Progress
                        width="100%"
                        colorScheme="red"
                        rounded="full"
                        value={100}
                    />
                    <ErrorIcon />
                </Flex>
            </GridItem>
        </Fragment>
    );
};
export default ErrorItem;
