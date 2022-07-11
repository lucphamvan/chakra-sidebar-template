import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Eye, EyeOff, Key } from "react-feather";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

interface InputPasswordProp {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required: any;
    placeholder: string;
    name: string;
    watch?: UseFormWatch<FieldValues>;
}
const InputPassword = ({ register, name, required, placeholder, errors, watch }: InputPasswordProp) => {
    const [show, setShow] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);

    const password = useRef<any>();
    password.current = watch!(name, "");

    const toggleShow = () => {
        setShow((value) => !value);
    };

    const toggleShowRepeat = () => {
        setShowRepeat((value) => !value);
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
                            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                            return (
                                regex.test(value) ||
                                "Minimum eight characters, at least one upercase, one lowercase and one number"
                            );
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

            <InputGroup size="lg">
                <InputLeftElement children={<Key color="#738F93" />} />
                <Input
                    fontSize="1rem"
                    bg="#EDF2F7"
                    _placeholder={{ fontSize: "1rem" }}
                    variant="flushed"
                    {...register("password_repeat", {
                        required,
                        validate: (value) => {
                            return value === password.current || "The password does not match";
                        }
                    })}
                    type={showRepeat ? "text" : "password"}
                    placeholder={`${placeholder} confirm`}
                />
                <InputRightElement
                    onClick={toggleShowRepeat}
                    cursor="pointer"
                    children={showRepeat ? <EyeOff size="1rem" color="#738F93" /> : <Eye size="1rem" color="#738F93" />}
                />
            </InputGroup>
            <Box color="red.400" fontSize="sm">
                {errors["password_repeat"]?.message}
            </Box>
        </Stack>
    );
};

export default InputPassword;
