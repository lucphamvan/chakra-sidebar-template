import { TabList as ChakraTabList, HStack, Icon, Text } from "@chakra-ui/react";
import Tab from "component/Tab";
import { FiLock as Lock, FiUser as User } from "react-icons/fi";

const TabList = () => {
    return (
        <ChakraTabList gap={4}>
            <Tab rounded="0.25rem">
                <HStack>
                    <Icon as={User} w={5} h={5} fontWeight="bold" />
                    <Text>Account</Text>
                </HStack>
            </Tab>
            <Tab rounded="0.25rem">
                <HStack>
                    <Icon as={Lock} w={5} h={5} fontWeight="bold" />
                    <Text>Security</Text>
                </HStack>
            </Tab>
        </ChakraTabList>
    );
};

export default TabList;
