import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PageHeading from "component/page-heading";

import TabList from "./tab-list";
import AccountSetting from "./tabs/account-setting";

export default function SettingPage() {
    return (
        <>
            <PageHeading>Setting Page</PageHeading>
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
