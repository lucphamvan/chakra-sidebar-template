import { Box, Image } from "@chakra-ui/react";
import usePopup from "context/modal-provider";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { CloseBtn, ImgBox, PrimaryBtn } from "./index.styled";
import UploadBox from "./upload-box";

export interface UploadImageProps {
    imgSrcList: string[]; // state handle list img src created from upload files => this use to render list image
    setImgSrcList: React.Dispatch<React.SetStateAction<string[]>>;
    files: File[]; // state handle list files upload => this use for API
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    primaryImgIndex: number | undefined;
    setPrimaryImgIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    maxUpload?: number;
    maxUploadNumber?: number;
    callback?: Function;
}

const UploadImage = ({
    imgSrcList,
    setImgSrcList,
    setFiles,
    files,
    primaryImgIndex,
    setPrimaryImgIndex,
    maxUpload = 10,
    maxUploadNumber = maxUpload,
    callback
}: UploadImageProps) => {
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
        if (imgSrcList.length + uploadedFileList.length > maxUpload) {
            alert(<Box fontWeight="semibold">Cannot upload more than {maxUploadNumber} images</Box>);
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
            if (primaryImgIndex === undefined) {
                return;
            }
            if (index < primaryImgIndex) {
                setPrimaryImgIndex((value) => value! - 1);
            } else if (index === primaryImgIndex) {
                setPrimaryImgIndex(0);
            }
        },
        [primaryImgIndex, setFiles, setImgSrcList, setPrimaryImgIndex]
    );

    const handleSetPrimaryImgIndex = useCallback(
        (index: number) => {
            setPrimaryImgIndex(index);
            callback && callback();
        },
        [setPrimaryImgIndex, callback]
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
                    onClick={() => handleSetPrimaryImgIndex(index)}
                />
            </ImgBox>
        ));
    }, [imgSrcList, primaryImgIndex, handleRemoveImg, handleSetPrimaryImgIndex]);

    return (
        <>
            <UploadBox getInputProps={getInputProps} getRootProps={getRootProps} />
            {ImageList}
        </>
    );
};

export default UploadImage;
