import { useForm } from "react-hook-form";
import { Flex, Heading } from "@chakra-ui/react";
import Card from "component/Card";
import StyledButton from "core/Button";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import usersService from "services/users.service";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchUser } from "redux/slices/authenSlice";
import { useEffect, useRef } from "react";
import utilService from "services/util.service";
import InputEmailForm from "component/Form/input-email";
import InputPassword from "component/Form/input-password";

const Link = styled(NavLink)`
    color: #097bbf;
    text-decoration: underline;
    font-size: 0.85rem;
`;

const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthen } = useAppSelector((state) => state.authen);
    const timeoutRefresh = useRef();

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
        } catch (error) {
            console.log("Invalid login or password");
        }
    };

    return (
        <Flex width="100vw" height="100vh" alignItems="center" flexDirection="column" justifyContent="center" gap="8">
            <Heading fontFamily={`"Source Code Pro", monospace`} fontSize="3rem" fontWeight="black">
                Template
            </Heading>
            <Card p="8">
                <Heading fontFamily={`"Source Code Pro", monospace`} fontSize="2rem" fontWeight="bold" mb={4}>
                    Login
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "25rem" }}>
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
                    <StyledButton
                        mt={4}
                        mode="primary"
                        isLoading={isSubmitting}
                        type="submit"
                        display="flex"
                        width="100%"
                        loadingText="Login..."
                    >
                        Login
                    </StyledButton>
                </form>
            </Card>
        </Flex>
    );
};
export default LoginPage;
