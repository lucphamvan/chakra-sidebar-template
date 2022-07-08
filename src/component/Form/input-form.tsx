import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Stack
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProp {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required: any;
    placeholder: string;
    name: string;
    leftIcon: React.ReactNode;
    type?: React.HTMLInputTypeAttribute;
}
const InputForm = ({
    register,
    name,
    required,
    placeholder,
    errors,
    leftIcon,
    type
}: InputProp) => {
    return (
        <Stack mb={4}>
            <InputGroup size="lg">
                <InputLeftElement children={leftIcon} />
                <Input
                    fontSize="1rem"
                    bg="#EDF2F7"
                    variant="flushed"
                    _placeholder={{ fontSize: "1rem" }}
                    {...register(name, {
                        required,
                        validate: (value) => {
                            if (type === "email") {
                                const regex = /^[^\s@]+@[^\s@]+$/;
                                return (
                                    regex.test(value) ||
                                    "Incorrect email format"
                                );
                            }
                            return undefined;
                        }
                    })}
                    placeholder={placeholder}
                />
            </InputGroup>
            <Box color="red.400" fontSize="sm">
                {errors[name]?.message}
            </Box>
        </Stack>
    );
};

export default InputForm;
