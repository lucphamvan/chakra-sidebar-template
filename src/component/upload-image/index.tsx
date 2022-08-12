import { Box } from "@chakra-ui/react";
import usePopup from "context/modal-provider";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import ImageItem from "./image-item";
import UploadBox from "./upload-box";

export interface UploadImageProps {
    imgSrcList: string[]; // state handle list img src created from upload files => this use to render list image
    setImgSrcList: React.Dispatch<React.SetStateAction<string[]>>;
    files: File[]; // state handle list files upload => this use for API
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    primaryImgIndex: number | undefined; // state hande primary image index
    setPrimaryImgIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    maxUpload?: number; // the limited number of uploaded image
    maxUploadNumber?: number; // property to display limited number text
    callback?: Function; // this callback will call when set primary index image
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
            onImageUpload(acceptedFiles);
        }
    });

    // handle change product image
    const onImageUpload = (uploadedFileList: File[]) => {
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
        (index: number, onToggle: any) => {
            onToggle();
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
        (index: number, onToggle: any) => {
            setPrimaryImgIndex(index);
            callback && callback();
            onToggle();
        },
        [setPrimaryImgIndex, callback]
    );

    // render list image upload
    const ImageList = useMemo(() => {
        if (!imgSrcList?.length) {
            return null;
        }
        return imgSrcList?.map((src, index) => {
            // const isPrimary = index === primaryImgIndex;
            return (
                <ImageItem
                    key={`img-${index}`}
                    src={src}
                    index={index}
                    primaryIndex={primaryImgIndex}
                    handleRemoveImg={handleRemoveImg}
                    handleSetPrimaryImgIndex={handleSetPrimaryImgIndex}
                />
            );
        });
    }, [imgSrcList, handleRemoveImg, handleSetPrimaryImgIndex, primaryImgIndex]);

    return (
        <>
            <UploadBox getInputProps={getInputProps} getRootProps={getRootProps} />
            {ImageList}
        </>
    );
};

export default UploadImage;
