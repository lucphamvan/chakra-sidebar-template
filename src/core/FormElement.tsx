import { FormControl, FormLabel, Input, FormErrorMessage, Grid, GridItem, Box } from "@chakra-ui/react";

import { FieldValues, useForm, UseFormRegister, Controller, Control } from "react-hook-form";

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

interface InputHookFormProp {
    control: Control<FieldValues, any>;
    name: string;
    label: string;
    errors: Record<string, any>;
    placeholder?: string;
    required?: string;
    type?: React.HTMLInputTypeAttribute;
}
export const InputHookForm = ({ control, name, label, errors, placeholder, required, type }: InputHookFormProp) => {
    return (
        <FormControl minW={["18rem", "20rem", "24rem"]} mb="4">
            <FormLabel fontSize="sm" htmlFor={name}>
                {label}
            </FormLabel>
            <Controller
                control={control}
                name={name}
                defaultValue=""
                rules={{
                    required,
                    validate: (value) => {
                        if (type === "email") {
                            const regex = /^[^\s@]+@[^\s@]+$/;
                            return regex.test(value) || "Incorrect email format";
                        }
                        return undefined;
                    },
                }}
                render={({ field }) => <Input placeholder={placeholder} type={type} {...field} />}
            />
            <Box fontSize="sm" color="red.400" mt="1">
                {errors[name]?.message}
            </Box>
        </FormControl>
    );
};
