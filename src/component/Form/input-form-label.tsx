import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputFormProp {
    name: string;
    label: string;
    errors: Record<string, any>;
    placeholder?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    type?: React.HTMLInputTypeAttribute;
}
export const InputFormLabel = ({ name, label, placeholder, required, errors, register, type }: InputFormProp) => {
    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel fontSize="sm" display="grid" alignItems="center" htmlFor={name}>
                {label}
            </FormLabel>
            <Input
                type={type || "text"}
                id={name}
                placeholder={placeholder ?? ""}
                {...register(name, {
                    required,
                    validate: (value) => {
                        if (type === "email") {
                            const regex = /^[^\s@]+@[^\s@]+$/;
                            return regex.test(value) || "Incorrect email format";
                        }
                        return undefined;
                    },
                })}
            />
            <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
    );
};
export default InputFormLabel;
