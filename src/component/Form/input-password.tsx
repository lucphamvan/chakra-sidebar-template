import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FiEye as Eye, FiEyeOff as EyeOff, FiKey as Key } from "react-icons/fi";

interface InputPasswordProp {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required: any;
    placeholder: string;
    name: string;
}
const InputPassword = ({ register, name, required, placeholder, errors }: InputPasswordProp) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow((value) => !value);
    };

    return (
        <Stack mb={4}>
            <InputGroup size="lg">
                <InputLeftElement children={<Key color="#738F93" />} />
                <Input
                    fontSize="1rem"
                    bg="#EDF2F7"
                    _placeholder={{ fontSize: "1rem" }}
                    variant="flushed"
                    {...register(name, {
                        required,
                        validate: (value) => {
                            return undefined;
                        }
                    })}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                />
                <InputRightElement
                    onClick={toggleShow}
                    cursor="pointer"
                    children={show ? <EyeOff size="1rem" color="#738F93" /> : <Eye size="1rem" color="#738F93" />}
                />
            </InputGroup>
            <Box color="red.400" fontSize="sm">
                {errors[name]?.message}
            </Box>
        </Stack>
    );
};

export default InputPassword;
