import { Flex, Grid, chakra, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import InputDescription from "component/Form/input-description";
import InputFormLabel from "component/Form/input-form-label";
import InputNumber from "component/Form/input-number";
import { notifyError } from "component/Toast";
import PageHeading from "component/page-heading";
import UploadImage from "component/upload-image";
import { ERROR } from "config/error";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

    const [files, setFiles] = useState<File[]>([]); // state handle list files upload
    const [imgSrcList, setImgSrcList] = useState<any[]>([]); // state handle list img src created from upload files
    const [primaryImgIndex, setPrimaryImgIndex] = useState<number | undefined>(0);

    // handle submit
    const onSubmit = async (data: any) => {
        try {
            const promiseList = files?.map((file) => {
                return fileService.upload(file);
            });
            const responseList = await Promise.all(promiseList);
            const fileIdList = responseList.map((res) => res.data.id);

            await productService.createProducts({
                name: data.name,
                price: Number(data.price),
                sold: false,
                description: data.desc,
                amount: Number(data.amount),
                fileId: fileIdList,
                imgUrl: responseList.at(primaryImgIndex!)?.data.url
            });

            setImgSrcList([]);
            setFiles([]);
            setPrimaryImgIndex(0);
            reset();
        } catch (error: any) {
            console.log("failed create product", error.message);
            notifyError(toast, "Failed to create product now. Check or try again later");
        }
    };

    // render
    return (
        <>
            <PageHeading>New Product</PageHeading>
            <Card width="100%" mt={4}>
                <chakra.form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDir="row" flexWrap="wrap" gap={4} alignItems="center">
                        <UploadImage
                            files={files}
                            setFiles={setFiles}
                            imgSrcList={imgSrcList}
                            setImgSrcList={setImgSrcList}
                            primaryImgIndex={primaryImgIndex}
                            setPrimaryImgIndex={setPrimaryImgIndex}
                        />
                    </Flex>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4} my={4}>
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
