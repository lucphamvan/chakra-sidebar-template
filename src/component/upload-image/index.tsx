import { Box, Flex, Image } from "@chakra-ui/react";
import usePopup from "context/modal-provider";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { CloseBtn, ImgBox, PrimaryBtn } from "./index.styled";
import UploadBox from "./upload-box";

interface Props {
    imgSrcList: string[]; // state handle list img src created from upload files
    setImgSrcList: React.Dispatch<React.SetStateAction<string[]>>;
    files: File[]; // state handle list files upload
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    primaryImgIndex: number;
    setPrimaryImgIndex: React.Dispatch<React.SetStateAction<number>>;
}
const UploadImage = ({ imgSrcList, setImgSrcList, setFiles, files, primaryImgIndex, setPrimaryImgIndex }: Props) => {
    const { alert } = usePopup();
    // ondrop
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".tif", ".tiff"]
        },
        onDrop: (acceptedFiles, rejectFiles, event) => {
            handleImgChange(acceptedFiles);
        }
    });

    // handle change product image
    const handleImgChange = (uploadedFileList: File[]) => {
        // limit 10 files
        if (imgSrcList.length + uploadedFileList.length > 10) {
            alert(<Box fontWeight="semibold">Cannot upload more than 10 images</Box>);
            return;
        }

        const _imgSrcList: string[] = [];
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

    const handleSetPrimaryImg = useCallback(
        (index: number) => {
            setPrimaryImgIndex(index);
        },
        [setPrimaryImgIndex]
    );

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
        [primaryImgIndex, setFiles, setImgSrcList, setPrimaryImgIndex]
    );

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
    }, [imgSrcList, primaryImgIndex, handleRemoveImg, handleSetPrimaryImg]);

    return (
        <Flex flexDir="row" flexWrap="wrap" gap={4} alignItems="center">
            <UploadBox getInputProps={getInputProps} getRootProps={getRootProps} />
            {ImageList}
        </Flex>
    );
};

export default UploadImage;
