import {
    Box,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputProps,
    NumberInputStepper,
    Stack,
    chakra
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputNumberProp extends NumberInputProps {
    register: UseFormRegister<FieldValues>;
    errors: Record<string, any>;
    required?: any; // required message
    placeholder?: string;
    name: string;
    label?: string;
    requiredWholeNumber?: boolean;
}
const InputNumber = ({
    name,
    register,
    errors,
    required,
    placeholder,
    label,
    requiredWholeNumber = false,
    ...props
}: InputNumberProp) => {
    return (
        <Stack mb={4}>
            <chakra.label fontSize="sm" htmlFor={name}>
                {label}
            </chakra.label>
            <NumberInput allowMouseWheel {...props}>
                <NumberInputField
                    {...register(name, {
                        required,
                        validate: (value) => {
                            if (requiredWholeNumber && !Number.isInteger(+value)) {
                                return "Value must be a whole number";
                            }

                            if (+value < props.min!) {
                                return "Value must be greater than " + props.min;
                            }

                            if (+value > props.max!) {
                                return "Value must be less than " + props.max;
                            }
                            return undefined;
                        }
                    })}
                    id={name}
                    placeholder={placeholder ?? ""}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Box fontWeight={500} color="red.400" fontSize="sm">
                {errors[name]?.message}
            </Box>
        </Stack>
    );
};

export default InputNumber;
