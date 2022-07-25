import { Heading, VStack, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import InputEmail from "component/Form/input-email";
import InputForm from "component/Form/input-form";
import InputPassword from "component/Form/input-password-signup";
import { notifyError, notifySuccess } from "component/Toast";
import { useForm } from "react-hook-form";
import { FiUser as User } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usersService from "services/users.service";

const SignupPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch
    } = useForm();

    const toast = useToast({
        duration: 3000,
        position: "top-right"
    });
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await usersService.signup(data.name, data.email, data.password);
            navigate("/");
            notifySuccess(toast, "CREATE ACCOUNT SUCCESSFULL. PLEASE LOGIN !");
        } catch (error: any) {
            notifyError(toast, "FAILED TO CREATE ACCOUNT. CHECK YOUR INFORMATION OR TRY AGAIN LATER !");
            console.log("failed to create user", error.message);
        }
    };

    return (
        <VStack height="100%" justifyContent="center" spacing={8}>
            <Heading className="special-font" fontSize="3rem" fontWeight="black">
                Template
            </Heading>
            <Card p={8} minWidth={{ sm: "20rem", md: "25rem" }}>
                <Heading className="special-font" fontSize="2rem" fontWeight="bold" mb={4}>
                    Sign Up
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        name="name"
                        errors={errors}
                        placeholder="Full name"
                        register={register}
                        required="This field is required"
                        leftIcon={<User color="#738F93" />}
                    />
                    <InputEmail
                        name="email"
                        errors={errors}
                        placeholder="Email"
                        register={register}
                        required="This field is required"
                        signup
                    />
                    <InputPassword
                        name="password"
                        errors={errors}
                        placeholder="Password"
                        register={register}
                        required="This field is required"
                        watch={watch}
                    />
                    <Button
                        mt={4}
                        mode="primary"
                        type="submit"
                        isLoading={isSubmitting}
                        display="flex"
                        width="100%"
                        loadingText="Login..."
                    >
                        Sign up
                    </Button>
                </form>
            </Card>
            ;
        </VStack>
    );
};

export default SignupPage;
