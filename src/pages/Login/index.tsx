import { useForm } from "react-hook-form";
import {
    Divider,
    Heading,
    HStack,
    VStack,
    Box,
    useToast
} from "@chakra-ui/react";
import Card from "component/Card";
import Button from "component/Button";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import usersService from "services/users.service";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchUser } from "redux/slices/authenSlice";
import { useEffect, useRef } from "react";
import utilService from "services/util.service";
import InputEmailForm from "component/Form/input-email";
import InputPassword from "component/Form/input-password";
import { notifyError } from "component/Toast";

const Link = styled(NavLink)`
    color: #097bbf;
    text-decoration: underline;
    font-size: 0.85rem;
`;

const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthen } = useAppSelector((state) => state.authen);
    const timeoutRefresh = useRef();
    const toast = useToast({
        duration: 3000,
        position: "top-right"
    });

    useEffect(() => {
        if (isAuthen) {
            navigate("/", { replace: true });
        }
    }, [isAuthen, navigate]);

    const onSubmit = async (value: any) => {
        try {
            // login then fetch information
            await usersService.login(value.email, value.password);
            await dispatch(fetchUser());

            // setup refresh token interval
            utilService.setupRefreshToken(timeoutRefresh);

            // navigate to homepage
            navigate("/", { replace: true });
        } catch (error: any) {
            console.log("failed to login", error.message);
            notifyError(toast, "INVALID USER NAME OR PASSOWRD");
        }
    };

    return (
        <VStack height="100%" justifyContent="center" spacing={8}>
            <Heading
                fontFamily={`"Source Code Pro", monospace`}
                fontSize="3rem"
                fontWeight="black"
            >
                Template
            </Heading>
            <Card p="8" minWidth={{ sm: "20rem", md: "25rem" }}>
                <Heading
                    fontFamily={`"Source Code Pro", monospace`}
                    fontSize="2rem"
                    fontWeight="bold"
                    mb={4}
                >
                    Login
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputEmailForm
                        name="email"
                        register={register}
                        errors={errors}
                        placeholder="Email"
                        required="This field is required"
                    />
                    <InputPassword
                        name="password"
                        placeholder="Password"
                        register={register}
                        errors={errors}
                        required="This field is required"
                    />
                    <Link to={"/forgot_password"}>Forgot your password?</Link>
                    <Button
                        mt={4}
                        mode="primary"
                        isLoading={isSubmitting}
                        type="submit"
                        display="flex"
                        width="100%"
                        loadingText="Login..."
                    >
                        Login
                    </Button>
                </form>

                <Divider mt={6} mb={4} />
                <HStack justify={"center"}>
                    <Box fontSize="0.85rem">Don't have account</Box>
                    <Link to={"/sign-up"}>Create your account</Link>
                </HStack>
            </Card>
        </VStack>
    );
};
export default LoginPage;
