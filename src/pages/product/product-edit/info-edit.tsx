import { Flex, useToast } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import InputDescription from "component/form/input-description";
import InputFormLabel from "component/form/input-form-label";
import InputNumber from "component/form/input-number";
import { notifyError, notifySuccess } from "component/toast";
import { ERROR } from "config/error";
import { Product, ProductUpdateInput } from "model/Product";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productService from "services/product.service";

interface InfoEditProp {
    product: Product;
}
const InfoEdit = ({ product }: InfoEditProp) => {
    const toast = useToast({ position: "top-right" });
    const [price, setPrice] = useState(product.price);
    const [amount, setAmount] = useState(product.amount);

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

    const onSubmit = async (data: any) => {
        try {
            const updatedData: ProductUpdateInput = {
                name: data.name,
                amount: +data.amount,
                description: data.desc,
                price: +data.price
            };
            await productService.updateProduct(product.id, updatedData);
            notifySuccess(toast, "Update product successfull");
            // reload && reload();
        } catch (error) {
            console.log("Failed to update product information");
            notifyError(toast, "Update product failed");
        }
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
                            value={price}
                            setValue={setPrice}
                        />
                        <InputNumber
                            name="amount"
                            label="Amount"
                            errors={errors}
                            register={register}
                            requiredWholeNumber
                            min={0}
                            required={ERROR.REQUIRED}
                            value={amount}
                            setValue={setAmount}
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
