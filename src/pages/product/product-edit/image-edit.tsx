import { Box, Flex, Text } from "@chakra-ui/react";
import Button from "component/button";
import Card from "component/card";
import UploadImage, { UploadImageProps } from "component/upload-image";
import ImageItem from "component/upload-image/image-item";
import { File as ImgFile } from "model/File";
import { Product, ProductUpdateInput } from "model/Product";
import { useState } from "react";
import fileService from "services/file.service";
import productService from "services/product.service";

const getPrimaryIndex = (product: Product) => {
    return product.files?.findIndex((file) => file.url === product.imgUrl);
};
interface Props {
    product: Product;
}
const ImageEdit = ({ product }: Props) => {
    // state handle add new image
    const [imgSrcInsert, setImgSrcInsert] = useState<string[]>([]);
    const [fileInsert, setFileInsert] = useState<File[]>([]);
    const [primaryIndexInsert, setPrimaryIndexInsert] = useState<number | undefined>();

    // state handle remove current image
    const [productImgFile, setProductImgFile] = useState<ImgFile[] | undefined>(product.files);
    const [primaryIndex, setPrimaryIndex] = useState(getPrimaryIndex(product));
    const [isUpdating, setIsUpdating] = useState(false);

    // handle remove current image of product
    const handleRemoveImg = (index: number, onToggle: any) => {
        onToggle();
        if (!productImgFile) {
            return;
        }
        const _imgFiles = [...productImgFile];
        _imgFiles.splice(index, 1);
        setProductImgFile(_imgFiles);

        // re-calculate primary index when remove image
        if (primaryIndex === undefined) {
            return;
        }
        if (index < primaryIndex) {
            setPrimaryIndex((value) => value! - 1);
        } else if (index === primaryIndex) {
            setPrimaryIndex(undefined);
        }
        setPrimaryIndexInsert(undefined);
    };

    // handle set primary index of current image
    const handleSetPrimaryIndex = (index: number, onToggle: any) => {
        setPrimaryIndex(index);
        setPrimaryIndexInsert(undefined);
        onToggle();
    };

    // render current image
    const renderProductImg = () => {
        return productImgFile?.map((file, index) => {
            return (
                <ImageItem
                    key={`img-${index}`}
                    src={file.url}
                    index={index}
                    primaryIndex={primaryIndex}
                    handleRemoveImg={handleRemoveImg}
                    handleSetPrimaryImgIndex={handleSetPrimaryIndex}
                />
            );
        });
    };

    /**
     * 2 step
     * @ step 1: remove old image (if have)
     * @ step 2: add new image to product
     */
    const updateProductImage = async () => {
        try {
            setIsUpdating(true);
            // step 1 : remove old image
            const listProductImgId = productImgFile?.map((file) => file.id);
            const listRemoveFileId = product.files
                ?.filter((file) => !listProductImgId?.includes(file.id))
                .map((file) => file.id);

            if (listRemoveFileId && listRemoveFileId.length) {
                await fileService.deleteMany(listRemoveFileId);
            }

            // step 2 : add new images
            // upload new images file
            const promiseUploadList = fileInsert.map((file) => fileService.upload(file));
            const responseList = await Promise.all(promiseUploadList);
            const fileIdList = responseList.map((res) => res.data.id);
            // get imgURL
            let imgUrl;
            if (primaryIndex !== undefined) {
                imgUrl = productImgFile?.at(primaryIndex)?.url;
                console.log("img url", imgUrl);
            } else if (primaryIndexInsert !== undefined) {
                imgUrl = responseList.at(primaryIndexInsert)?.data.url;
            } else {
                imgUrl = null; // set to null => api accept this to set imgUrl to null;
            }
            // connect uploaded images to product
            const data: ProductUpdateInput = {
                fileId: fileIdList,
                imgUrl
            };
            await productService.updateProduct(product.id, data);
        } catch (error: any) {
            console.log(`failed to update product`, error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const uploadImgProps: UploadImageProps = {
        imgSrcList: imgSrcInsert,
        setImgSrcList: setImgSrcInsert,
        files: fileInsert,
        setFiles: setFileInsert,
        primaryImgIndex: primaryIndexInsert,
        setPrimaryImgIndex: setPrimaryIndexInsert,
        maxUpload: 10 - (productImgFile?.length ?? 0),
        maxUploadNumber: 10,
        callback: () => setPrimaryIndex(undefined)
    };
    return (
        <>
            <Card w="100%" overflowX="hidden" h="100%" justifyContent="space-between" display="flex" flexDir="column">
                <Box>
                    <Text mb={4} fontWeight="bold">
                        Update Image
                    </Text>
                    <Flex flexDir="row" flexWrap="wrap" gap={4} alignItems="center">
                        {/* component upload new image */}
                        <UploadImage {...uploadImgProps} />

                        {/* component render current image of product */}
                        {renderProductImg()}
                    </Flex>
                </Box>
                <Button mt={4} onClick={updateProductImage} isLoading={isUpdating}>
                    Update
                </Button>
            </Card>
        </>
    );
};

export default ImageEdit;
