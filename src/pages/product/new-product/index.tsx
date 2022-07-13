import { Grid, chakra, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import InputFormLabel from "component/Form/input-form-label";
import InputNumber from "component/Form/input-number";
import { notifyError } from "component/Toast";
import PageHeading from "component/page-heading";
import { useForm } from "react-hook-form";
import productService from "services/product.service";

const NewProductPage = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset
    } = useForm();
    const toast = useToast({ duration: 3000 });

    // handle submit
    const onSubmit = async (data: any) => {
        try {
            console.log("data", data);
            await productService.createProducts({
                name: data.name,
                price: Number(data.price),
                sold: false,
                description: data.desc,
                amount: Number(data.amount)
            });
            reset({
                name: null,
                desc: null,
                amount: "0",
                price: "0"
            });
        } catch (error: any) {
            console.log("failed create product", error.message);
            notifyError(toast, "Failed to create product now. Check or try again later");
        }
    };

    // render
    return (
        <>
            <PageHeading>New Product Page</PageHeading>
            <Card width="100%" mt={4}>
                <chakra.form onSubmit={handleSubmit(onSubmit)}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                        <InputFormLabel
                            name="name"
                            label="Name"
                            errors={errors}
                            register={register}
                            placeholder="Product name"
                        />
                        <InputFormLabel
                            name="desc"
                            label="Description"
                            errors={errors}
                            register={register}
                            placeholder="Product description"
                        />
                        <InputNumber name="price" label="Price (USD)" errors={errors} register={register} min={0} />
                        <InputNumber
                            name="amount"
                            label="Amount"
                            errors={errors}
                            register={register}
                            requiredWholeNumber
                            min={0}
                        />
                    </Grid>
                    <Button type="submit" loadingText="Creating..." isLoading={isSubmitting}>
                        Create
                    </Button>
                </chakra.form>
            </Card>
        </>
    );
};
export default NewProductPage;
