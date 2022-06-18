import { Box, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { User } from "react-feather";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputEmailFormProp {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required: any;
    placeholder: string;
    name: string;
}
const InputEmailForm = ({ register, name, required, placeholder, errors }: InputEmailFormProp) => {
    return (
        <Stack mb={4}>
            <InputGroup size="lg">
                <InputLeftElement children={<User color="#738F93" />} />
                <Input
                    fontSize="1rem"
                    bg="#EDF2F7"
                    variant="flushed"
                    _placeholder={{ fontSize: "1rem" }}
                    {...register(name, {
                        required,
                        validate: (value) => {
                            const regex = /^[^\s@]+@[^\s@]+$/;
                            return regex.test(value) || "Incorrect email format";
                        },
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
