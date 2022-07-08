import { WarningIcon } from "@chakra-ui/icons";
import { GridItem, Flex, Progress, Icon } from "@chakra-ui/react";
import { Fragment } from "react";

const ErrorItem = ({ name }: { name: string }) => {
    return (
        <Fragment>
            <GridItem alignItems="center" className="special-font" noOfLines={1}>
                {name}
            </GridItem>
            <GridItem alignItems="center">
                <Flex alignItems="center" width="100%" gap={4}>
                    <Progress width="100%" colorScheme="red" rounded="full" value={100} />
                    <Icon fontSize="22px" color="red.400" as={WarningIcon} />
                </Flex>
            </GridItem>
        </Fragment>
    );
};
export default ErrorItem;
