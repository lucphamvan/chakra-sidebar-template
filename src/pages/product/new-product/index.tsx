import { Box, Flex, Grid, Image, chakra, useToast } from "@chakra-ui/react";
import Button from "component/Button";
import Card from "component/Card";
import InputFormLabel from "component/Form/input-form-label";
import InputNumber from "component/Form/input-number";
import { notifyError } from "component/Toast";
import PageHeading from "component/page-heading";
import { ERROR } from "config/error";
import usePopup from "context/modal-provider";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import fileService from "services/file.service";
import productService from "services/product.service";

import { CloseBtn, ImgBox, PrimaryBtn } from "./index.styled";
import UploadBox from "./upload-box";

const NewProductPage = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset
    } = useForm();
    const { alert } = usePopup();
    const toast = useToast({ duration: 3000 });

    const [files, setFiles] = useState<File[]>([]); // state handle list files upload
    const [imgSrcList, setImgSrcList] = useState<any[]>([]); // state handle list img src created from upload files
    const [primaryImgIndex, setPrimaryImgIndex] = useState(0);

    // ondrop
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".tif", ".tiff"]
        },
        onDrop: (acceptedFiles, rejectFiles, event) => {
            handleImgChange(acceptedFiles);
        }
    });

    // remove image
    const handleRemoveImg = useCallback(
        (index: number) => {
            setImgSrcList((value) => {
                const copy = [...value];
                copy.splice(index, 1);
                return copy;
            });
            setFiles((value) => {
                const copy = [...value];
                copy.splice(index, 1);
                return copy;
            });
            // re-calculate primary index
            // if remove index less than current primary index => descrease primary index by 1
            if (index < primaryImgIndex) {
                setPrimaryImgIndex((value) => value - 1);
            } else if (index === primaryImgIndex) {
                setPrimaryImgIndex(0);
            }
        },
        [primaryImgIndex]
    );

    const handleSetPrimaryImg = (index: number) => {
        setPrimaryImgIndex(index);
    };

    // render list image upload
    const ImageList = useMemo(() => {
        if (!imgSrcList?.length) {
            return null;
        }

        return imgSrcList?.map((src, index) => (
            <ImgBox key={`img-${index}`}>
                <Image bg="gray.100" src={src} objectFit="scale-down" boxSize="40" />
                <CloseBtn aria-label="close" onClick={() => handleRemoveImg(index)} />
                <PrimaryBtn
                    aria-label="primary product image"
                    style={{ visibility: index === primaryImgIndex ? "visible" : "hidden" }}
                    onClick={() => handleSetPrimaryImg(index)}
                />
            </ImgBox>
        ));
    }, [imgSrcList, primaryImgIndex, handleRemoveImg]);

    // handle change product image
    const handleImgChange = (uploadedFileList: File[]) => {
        // limit 10 files
        if (imgSrcList.length + uploadedFileList.length >= 10) {
            alert(<Box fontWeight="semibold">Cannot upload more than 10 images</Box>);
            return;
        }

        const _imgSrcList: any[] = [];
        const _files: File[] = [];
        if (uploadedFileList) {
            uploadedFileList.forEach((file) => {
                _imgSrcList.push(URL.createObjectURL(file as any));
                _files.push(file);
            });
        }
        setImgSrcList([...imgSrcList, ..._imgSrcList]);
        setFiles([...files, ..._files]);
    };

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
                imgUrl: responseList.at(primaryImgIndex)?.data.url
            });

            setImgSrcList([]);
            setFiles([]);
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
                        <UploadBox getInputProps={getInputProps} getRootProps={getRootProps} />
                        {ImageList}
                    </Flex>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} my={4}>
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
