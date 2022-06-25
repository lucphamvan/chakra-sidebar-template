import { Heading, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabList from "./TabList";
import AccountSetting from "./tabs/AccountSetting";

export default function SettingPage() {
    return (
        <>
            <Heading>Setting Page</Heading>
            <Tabs isLazy mt={4} variant="solid-rounded" colorScheme={"primary"}>
                <TabList />
                <TabPanels>
                    <TabPanel px={0}>
                        <AccountSetting />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
