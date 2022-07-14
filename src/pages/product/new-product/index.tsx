import { Box, Grid, Icon, Image, Input, chakra, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import InputFormLabel from "component/Form/input-form-label";
import InputNumber from "component/Form/input-number";
import { notifyError } from "component/Toast";
import PageHeading from "component/page-heading";
import { ERROR } from "config/error";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdFileUpload } from "react-icons/md";
import fileService from "services/file.service";
import productService from "services/product.service";

const NewProductPage = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset
    } = useForm();
    const toast = useToast({ duration: 3000 });

    const [file, setFile] = useState<File | null>(null);
    const [img, setImg] = useState<any>(null);

    // handle change product image
    const handleImgChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        }
    };

    // handle submit
    const onSubmit = async (data: any) => {
        try {
            let url;
            if (file) {
                const response = await fileService.upload(file);
                url = response.data.url;
            }
            await productService.createProducts({
                name: data.name,
                price: Number(data.price),
                sold: false,
                description: data.desc,
                amount: Number(data.amount),
                imgUrl: url
            });
            setImg(null);
            setFile(null);
            reset();
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
                    <Box
                        w={60}
                        h={60}
                        mb={4}
                        backgroundColor="#F3F7F7"
                        display="flex"
                        position="relative"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImgChange}
                            opacity={0}
                            position="absolute"
                            height="100%"
                        />
                        {!img && (
                            <Box>
                                <Icon as={MdFileUpload} w="4rem" h="4rem" />
                            </Box>
                        )}
                        {!!img && <Image src={img} objectFit="cover" boxSize="100%" />}
                    </Box>

                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                        <InputFormLabel
                            name="name"
                            label="Name"
                            errors={errors}
                            register={register}
                            placeholder="Product name"
                            required={ERROR.REQUIRED}
                        />
                        <InputFormLabel
                            name="desc"
                            label="Description"
                            errors={errors}
                            register={register}
                            placeholder="Product description"
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
