import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Stack
} from "@chakra-ui/react";
import { Mail } from "react-feather";
import { FieldValues, UseFormRegister } from "react-hook-form";
import usersService from "services/users.service";

interface InputEmailFormProp {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required: any;
    placeholder: string;
    name: string;
    signup?: boolean;
}
const InputEmailForm = ({
    register,
    name,
    required,
    placeholder,
    errors,
    signup
}: InputEmailFormProp) => {
    return (
        <Stack mb={4}>
            <InputGroup size="lg">
                <InputLeftElement children={<Mail color="#738F93" />} />
                <Input
                    fontSize="1rem"
                    bg="#EDF2F7"
                    variant="flushed"
                    _placeholder={{ fontSize: "1rem" }}
                    {...register(name, {
                        required,
                        validate: async (value) => {
                            const regex = /^[^\s@]+@[^\s@]+$/;
                            if (!regex.test(value)) {
                                return "Incorrect email format";
                            }
                            let isValid = true;
                            if (signup) {
                                isValid = await usersService.checkUserEmail(
                                    value
                                );
                            }
                            return (
                                isValid || "Email was used by another person"
                            );
                        }
                    })}
                    type="email"
                    placeholder={placeholder}
                />
            </InputGroup>
            <Box color="red.400" fontSize="sm">
                {errors[name]?.message}
            </Box>
        </Stack>
    );
};

export default InputEmailForm;
