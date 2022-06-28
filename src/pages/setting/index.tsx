import { Heading, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabList from "./tab-list";
import AccountSetting from "./tabs/account-setting";

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
