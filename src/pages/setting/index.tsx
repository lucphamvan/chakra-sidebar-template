import {
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Wrap,
    chakra,
} from "@chakra-ui/react";
import InputFormLabel from "component/Form/input-form-label";
import Tab from "component/Tab";
import Button from "core/Button";
import { Lock, User } from "react-feather";
import { useForm } from "react-hook-form";
import Card from "../../component/Card";

export default function SettingPage() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <Heading>Setting Page</Heading>
            <Tabs mt={4} variant="solid-rounded" colorScheme={"primary"}>
                <TabList>
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
                </TabList>
                <TabPanels>
                    <TabPanel px={0}>
                        <Card width="initial">
                            <Heading fontSize="1.25rem" fontWeight="semibold">
                                Profile Details
                            </Heading>
                            <Divider my={4} />
                            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                                <Grid
                                    templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
                                    gap={8}
                                    rowGap={4}
                                >
                                    <GridItem>
                                        <InputFormLabel
                                            name="name"
                                            label="User Name"
                                            errors={errors}
                                            register={register}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <InputFormLabel name="emal" label="Email" errors={errors} register={register} />
                                    </GridItem>
                                    <GridItem>
                                        <InputFormLabel
                                            name="phone"
                                            label="Phone Number"
                                            errors={errors}
                                            register={register}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <InputFormLabel
                                            name="address"
                                            label="Address"
                                            errors={errors}
                                            register={register}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <Wrap gap={4} spacing={4}>
                                            <Button
                                                isLoading={isSubmitting}
                                                type="submit"
                                                mode="primary"
                                                loadingText="Saving changes..."
                                            >
                                                Save changes
                                            </Button>
                                            <Button mode="secondary">Discard</Button>
                                        </Wrap>
                                    </GridItem>
                                </Grid>
                            </chakra.form>
                        </Card>
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
