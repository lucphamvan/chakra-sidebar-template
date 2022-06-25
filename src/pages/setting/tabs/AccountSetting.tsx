import { Heading, Divider, chakra, GridItem, Wrap, Grid, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Card from "component/Card";
import Button from "core/Button";
import InputFormLabel from "component/Form/input-form-label";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchUser } from "redux/slices/authenSlice";

import usersService from "services/users.service";
import { notifySuccess } from "component/Toast";

const AccountSetting = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const { user } = useAppSelector((state) => state.authen);
    const dispatch = useAppDispatch();
    const toast = useToast({ duration: 3000, position: "top-right" });

    // handle update user
    const onSubmit = async (data: any) => {
        try {
            await usersService.updateUser(data.name);
            await dispatch(fetchUser());
            notifySuccess(toast, "UPDATE USER INFO SUCCESSFULL");
        } catch (error: any) {
            console.log("failed to update user data");
        }
    };

    // handle disard change before update
    const discardChange = () => {
        reset({
            name: user?.name,
            phone: "",
            address: "",
        });
    };

    return (
        <Card width="initial">
            <Heading fontSize="1.25rem" fontWeight="semibold">
                Profile Details
            </Heading>
            <Divider my={4} />
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={8} rowGap={4}>
                    <GridItem>
                        <InputFormLabel
                            defaultValue={user?.name}
                            name="name"
                            label="User Name"
                            errors={errors}
                            register={register}
                        />
                    </GridItem>
                    <GridItem>
                        <InputFormLabel
                            disabled
                            name="emal"
                            label="Email"
                            errors={errors}
                            register={register}
                            defaultValue={user?.email}
                        />
                    </GridItem>
                    <GridItem>
                        <InputFormLabel
                            type="number"
                            name="phone"
                            label="Phone Number"
                            errors={errors}
                            register={register}
                        />
                    </GridItem>
                    <GridItem>
                        <InputFormLabel name="address" label="Address" errors={errors} register={register} />
                    </GridItem>
                    <GridItem>
                        <Wrap gap={4} spacing={4}>
                            <Button isLoading={isSubmitting} type="submit" loadingText="Saving changes...">
                                Save changes
                            </Button>
                            <Button mode="secondary" onClick={discardChange}>
                                Discard
                            </Button>
                        </Wrap>
                    </GridItem>
                </Grid>
            </chakra.form>
        </Card>
    );
};

export default AccountSetting;
