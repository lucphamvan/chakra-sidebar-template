import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
    name: string;
    label: string;
    errors: Record<string, any>;
    placeholder?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    disabled?: boolean;
    defaultValue?: string;
}
export const InputDescription = ({
    name,
    label,
    placeholder,
    required,
    errors,
    register,
    disabled = false,
    defaultValue = ""
}: Props) => {
    return (
        <FormControl isInvalid={errors[name]}>
            <FormLabel fontSize="sm" fontWeight={400} htmlFor={name}>
                {label}
            </FormLabel>
            <Textarea
                defaultValue={defaultValue}
                id={name}
                disabled={disabled}
                placeholder={placeholder ?? ""}
                {...register(name, {
                    required,
                    validate: (value) => {
                        return undefined;
                    }
                })}
            />
            <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
    );
};
export default InputDescription;
