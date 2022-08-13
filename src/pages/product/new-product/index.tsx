import { Box, Divider, Flex, GridItem, chakra, useToast } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import InputDescription from "component/form/input-description";
import InputFormLabel from "component/form/input-form-label";
import InputNumber from "component/form/input-number";
import PageHeading from "component/page-heading";
import { notifyError } from "component/toast";
import UploadImage from "component/upload-image";
import { ERROR } from "config/error";
import { useState } from "react";
import { useForm } from "react-hook-form";
import fileService from "services/file.service";
import productService from "services/product.service";

import { Grid } from "./index.styled";

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
    const [price, setPrice] = useState<number>();
    const [amount, setAmount] = useState<number>();

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
            setPrice(0);
            setAmount(0);
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
                    <Grid templateColumns="1fr 2px 2fr" gap={12} my={4}>
                        <GridItem>
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
                        </GridItem>
                        <GridItem>
                            <Divider orientation="vertical" />
                        </GridItem>
                        <GridItem>
                            <Box fontSize="sm" mb={2}>
                                Product images
                            </Box>
                            <Flex flexDir="row" flexWrap="wrap" gap={4}>
                                <UploadImage
                                    files={files}
                                    setFiles={setFiles}
                                    imgSrcList={imgSrcList}
                                    setImgSrcList={setImgSrcList}
                                    primaryImgIndex={primaryImgIndex}
                                    setPrimaryImgIndex={setPrimaryImgIndex}
                                />
                            </Flex>
                        </GridItem>
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
