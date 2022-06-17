import { useForm } from "react-hook-form";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Card from "component/Card";
import { InputForm } from "core/Form";
import StyledButton from "core/Button";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import usersService from "services/users.service";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchUser } from "redux/slices/authenSlice";
import { useEffect, useRef } from "react";
import utilService from "services/util.service";

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
                <Box fontFamily={`"Source Code Pro", monospace`} fontWeight="600" fontSize="2rem" mb="4">
                    LOGIN
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        name="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        placeholder="Email"
                        required="This field is required"
                    />
                    <InputForm
                        name="password"
                        type="password"
                        label="Password"
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
                        display="block"
                        width="100%"
                    >
                        Submit
                    </StyledButton>
                </form>
            </Card>
        </Flex>
    );
};
export default LoginPage;
