import { FormControl, FormLabel, Input, FormErrorMessage, Grid } from "@chakra-ui/react";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFormProp {
    name: string;
    label: string;
    errors: Record<string, any>;
    placeholder?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    type?: React.HTMLInputTypeAttribute;
}

export const InputForm = ({ name, label, placeholder, required, errors, register, type }: InputFormProp) => {
    return (
        <FormControl isInvalid={errors[name]} mb="4">
            <Grid templateColumns={"1fr 3fr"} gap="4" alignContent={"center"} justifyContent="center">
                <FormLabel display="grid" alignItems="center" mb={0}>
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
            </Grid>
            <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
    );
};
