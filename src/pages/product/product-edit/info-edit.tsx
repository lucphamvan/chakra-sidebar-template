import { Flex, chakra, useToast } from "@chakra-ui/react";
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
import { useNavigate } from "react-router-dom";
import productService from "services/product.service";

interface InfoEditProp {
    product: Product;
}
const InfoEdit = ({ product }: InfoEditProp) => {
    const toast = useToast({ position: "top-right" });
    const [price, setPrice] = useState(product.price);
    const [amount, setAmount] = useState(product.amount);
    const navigate = useNavigate();

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

    const goBack = () => navigate(-1);

    const onSubmit = async (data: any) => {
        try {
            const updatedData: ProductUpdateInput = {
                name: data.name,
                amount: +data.amount,
                description: data.desc,
                price: +data.price
            };
            await productService.updateProduct(product.id, updatedData);
            notifySuccess(toast, "Update product information successfull");
            // reload && reload();
        } catch (error) {
            console.log("Failed to update product information");
            notifyError(toast, "Update product failed");
        }
    };
    return (
        <>
            <chakra.form h="100%" onSubmit={handleSubmit(onSubmit)}>
                <Card w="100%">
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
                    </Flex>
                </Card>
                <Flex gap={6}>
                    <Button mt="4" type="submit" isLoading={isSubmitting}>
                        Update Information
                    </Button>
                    <Button mt="4" mode="secondary" onClick={goBack}>
                        Back
                    </Button>
                </Flex>
            </chakra.form>
        </>
    );
};
export default InfoEdit;
