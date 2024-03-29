import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFormProp {
    name: string;
    label: string;
    errors: Record<string, any>;
    placeholder?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    type?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    defaultValue?: string;
}
export const InputFormLabel = ({
    name,
    label,
    placeholder,
    required,
    errors,
    register,
    type,
    disabled = false,
    defaultValue = ""
}: InputFormProp) => {
    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel fontSize="sm" fontWeight={400} htmlFor={name}>
                {label}
            </FormLabel>
            <Input
                defaultValue={defaultValue}
                type={type || "text"}
                id={name}
                disabled={disabled}
                placeholder={placeholder ?? ""}
                {...register(name, {
                    required,
                    validate: (value) => {
                        if (type === "email") {
                            const regex = /^[^\s@]+@[^\s@]+$/;
                            return regex.test(value) || "Incorrect email format";
                        }
                        return undefined;
                    }
                })}
            />
            <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
    );
};
export default InputFormLabel;
