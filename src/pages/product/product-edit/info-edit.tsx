import { Flex } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import InputDescription from "component/form/input-description";
import InputFormLabel from "component/form/input-form-label";
import InputNumber from "component/form/input-number";
import { ERROR } from "config/error";
import { Product } from "model/Product";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface InfoEditProp {
    product: Product;
}
const InfoEdit = ({ product }: InfoEditProp) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        reset({
            name: product.name,
            price: product.price,
            amount: product.amount,
            desc: product.description
        });
    }, [product, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <>
            <Card w="100%" h="100%">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDir="column" gap={4}>
                        <InputFormLabel
                            name="name"
                            label="Name"
                            errors={errors}
                            register={register}
                            placeholder="Product name"
                            required={ERROR.REQUIRED}
                        />

                        <InputNumber
                            name="price"
                            label="Price (USD)"
                            errors={errors}
                            register={register}
                            min={0}
                            required={ERROR.REQUIRED}
                        />
                        <InputNumber
                            name="amount"
                            label="Amount"
                            errors={errors}
                            register={register}
                            requiredWholeNumber
                            min={0}
                            required={ERROR.REQUIRED}
                        />
                        <InputDescription
                            name="desc"
                            label="Description"
                            errors={errors}
                            register={register}
                            placeholder="Product description"
                            required={ERROR.REQUIRED}
                        />

                        <Button type="submit" isLoading={isSubmitting}>
                            Update
                        </Button>
                    </Flex>
                </form>
            </Card>
        </>
    );
};
export default InfoEdit;
