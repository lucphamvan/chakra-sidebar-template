import { TabList as ChakraTabList, HStack, Icon, Text } from "@chakra-ui/react";
import Tab from "component/Tab";
import { Lock, User } from "react-feather";

const TabList = () => {
    return (
        <ChakraTabList>
            <Tab>
                <HStack>
                    <Icon as={User} w={5} h={5} fontWeight="bold" />
                    <Text>Account</Text>
                </HStack>
            </Tab>
            <Tab>
                <HStack>
                    <Icon as={Lock} w={5} h={5} fontWeight="bold" />
                    <Text>Security</Text>
                </HStack>
            </Tab>
        </ChakraTabList>
    );
};

export default TabList;
