import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Tooltip,
    chakra,
    useToast
} from "@chakra-ui/react";
import { notifySuccess } from "component/Toast";
import { STYLE } from "config";
import { useRef, useState } from "react";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { FaFolderOpen } from "react-icons/fa";
import fileService from "services/file.service";

import ListErrorFile from "./ListErrorFile";
import ListUploadedFile from "./ListUploadedFile";
import ResumeMenu from "./ResumeMenu";
import { Status, StatusFile } from "./type";

interface UploadModalProp {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    reload: () => void;
}
const UploadModal = ({ isOpen, onToggle, onClose, reload }: UploadModalProp) => {
    const [processingUploadFiles, setProcessingUploadFiles] = useState<Status>({
        files: []
    }); // store information of processing upload files

    const [failedUploadFiles, setFailedUploadFiles] = useState<string[]>([]); // all failed files from calling api
    const [failedSizeFiles, setFailedSizeFiles] = useState<string[]>([]); // all failed files with invalid size, verify by drop-zone
    const [failedTypeFiles, setFailedTypeFiles] = useState<string[]>([]); // all failed files with invalid type, verify by drop-zone
    const [allUploadedFiles, setAllUploadedFiles] = useState<string[]>([]); // all success uploaded files

    const [isUploading, setIsUploading] = useState(false); // disable modal upload or not
    const [isStartedUpload, setIsStartedUpload] = useState(false);

    const statusRef = useRef<any>(null); // ref to keep track status information
    const toast = useToast({
        duration: 3000,
        isClosable: true,
        position: "top-right"
    });
    // hook dropzone
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        // accept: {
        //     "application/pdf": [".pdf"]
        // },
        maxSize: 20000000, // limit 20Mb
        disabled: isUploading,
        // occur when drop files to upload
        onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setIsUploading(true);
            // handle error when drag/drop files at client side
            const invalidSizeFiles: string[] = [];
            const invalidTypeFiles: string[] = [];
            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
                    switch (err.code) {
                        case ErrorCode.FileTooLarge:
                            invalidSizeFiles.push(file.file.name);
                            break;
                        case ErrorCode.FileInvalidType:
                            invalidTypeFiles.push(file.file.name);
                            break;
                        default:
                            break;
                    }
                });
            });
            // add error files into list to display
            setFailedSizeFiles((files) => [...files, ...invalidSizeFiles]);
            setFailedTypeFiles((files) => [...files, ...invalidTypeFiles]);

            // this step keep state of all success uploaded files
            const prevUploadedFile = Array.from(processingUploadFiles.files).map((file) => file.name);
            setAllUploadedFiles((files) => [...prevUploadedFile, ...files]);

            // reset processingUploadFiles and start upload files
            setProcessingUploadFiles({ files: [] });
            setIsStartedUpload(true);
            uploadFiles(acceptedFiles);
        }
    });

    // handle upload file
    const uploadFiles = (acceptedFiles: File[]) => {
        // init status upload info
        const initProcessingFiles = acceptedFiles.map((file) => {
            return {
                name: file.name,
                percent: 0,
                controller: new AbortController(),
                finished: false
            } as StatusFile;
        });
        statusRef.current = {
            files: initProcessingFiles
        };

        // define handler when upload files
        const uploadPromises = acceptedFiles.map(async (file, i) => {
            const processingFiles: StatusFile[] = [...statusRef.current.files];
            try {
                // upload file
                await fileService.upload(
                    file,
                    (event) => {
                        // update percent of upload files
                        (processingFiles[i] as StatusFile).percent = Math.round((100 * event.loaded) / event.total);
                        // filter processing files
                        const notFailedFiles = processingFiles.filter((status) => status.percent !== 0);
                        // update state of processing files
                        setProcessingUploadFiles({ files: notFailedFiles });
                    },
                    (processingFiles[i] as StatusFile).controller
                );
                // upload done
                // mark files finished uploaded to render icon finished
                processingFiles[i].finished = true;
                // notify success
                const message = (
                    <Box>
                        Upload file <chakra.span fontWeight="extrabold">{file.name}</chakra.span> successfull
                    </Box>
                );
                notifySuccess(toast, message);
            } catch (error) {
                // handle upload file failed

                // remove failed files of list processing
                (processingFiles[i] as StatusFile).percent = 0;
                const notFailedFiles = processingFiles.filter((file) => file.percent !== 0);
                setProcessingUploadFiles({ files: notFailedFiles });

                // add failed files to failed list
                setFailedUploadFiles((files) => [file.name, ...files]);
            }
        });

        // enable upload modal again
        Promise.all(uploadPromises).finally(() => {
            reload();
            setIsUploading(false);
        });
    };

    // reset all
    const reset = () => {
        setAllUploadedFiles([]);
        setFailedSizeFiles([]);
        setFailedTypeFiles([]);
        setFailedUploadFiles([]);
        setProcessingUploadFiles({ files: [] });
    };

    // cancel all uploading
    const abortUpload = () => {
        processingUploadFiles.files.forEach((file) => {
            file.controller.abort();
        });
        onToggle();
        setIsStartedUpload(false);
        // need trigger timeout here to wait axios do all job before reset value
        setTimeout(() => {
            reset();
        }, 100);
    };

    const numberError = failedUploadFiles.length + failedSizeFiles.length + failedTypeFiles.length;

    return (
        <>
            {/* modal upload */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent minW="40rem" maxW="50rem">
                    <ModalBody py={6}>
                        <Flex flexDir="column" gap={6}>
                            {/*Header section */}
                            <HStack justifyContent="space-evenly">
                                <Box className="special-font" fontSize="1.5rem" fontWeight="black">
                                    UPLOAD YOUR FILE
                                </Box>

                                <Flex position="absolute" top={2} right={4}>
                                    {/* minimize button */}

                                    <IconButton
                                        onClick={onToggle}
                                        variant="ghost"
                                        size="sm"
                                        color={STYLE.infoColor}
                                        _focus={{ outline: "none" }}
                                        aria-label="Minimize popup"
                                        icon={<MinusIcon />}
                                    />

                                    {/* close button */}
                                    <Tooltip placement="top" label="Close popup and cancel all uploading files">
                                        <IconButton
                                            onClick={abortUpload}
                                            variant="ghost"
                                            color={STYLE.infoColor}
                                            size="sm"
                                            _focus={{ outline: "none" }}
                                            aria-label="Close popup"
                                            icon={<CloseIcon />}
                                        />
                                    </Tooltip>
                                </Flex>
                            </HStack>

                            {/* Drop-Drag section */}
                            <Flex flexDir="column" gap={6}>
                                <Center
                                    {...getRootProps()}
                                    border="2px dashed"
                                    borderColor="gray.300"
                                    rounded="lg"
                                    cursor={isUploading ? "not-allowed" : "pointer"}
                                    flexDir="column"
                                    gap={4}
                                    py={6}
                                    opacity={isUploading ? 0.7 : 1}
                                >
                                    <chakra.input {...getInputProps()} />
                                    <Icon as={FaFolderOpen} width={24} height={24} color={STYLE.infoColor} />
                                    {isDragActive ? (
                                        <Text className="special-font" userSelect="none" fontWeight="bold">
                                            Drop the files here ...
                                        </Text>
                                    ) : (
                                        <Box userSelect="none" className="special-font" fontWeight="bold">
                                            Drag and drop your files, or
                                            <chakra.span color={STYLE.infoColor} className="special-font">
                                                {" "}
                                                Browse
                                            </chakra.span>
                                        </Box>
                                    )}
                                </Center>
                            </Flex>

                            {/* Status section */}
                            <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4} fontSize="0.875rem">
                                <GridItem height={"100%"}>
                                    <ListUploadedFile
                                        processingUploadFiles={processingUploadFiles}
                                        allUploadedFiles={allUploadedFiles}
                                    />
                                </GridItem>
                                <GridItem height={"100%"}>
                                    <ListErrorFile
                                        failedUploadFiles={failedUploadFiles}
                                        failedSizeFiles={failedSizeFiles}
                                        failedTypeFiles={failedTypeFiles}
                                    />
                                </GridItem>
                            </Grid>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {!isOpen && isStartedUpload && (
                <ResumeMenu resumeFunc={onToggle} isUploading={isUploading} numError={numberError} />
            )}
        </>
    );
};

export default UploadModal;
