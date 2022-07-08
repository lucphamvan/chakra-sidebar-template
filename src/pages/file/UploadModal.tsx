import { useRef, useState } from "react";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import {
    Flex,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Box,
    Divider,
    Center,
    chakra,
    Text,
    Icon,
    GridItem,
    Grid,
} from "@chakra-ui/react";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { FaFolderOpen } from "react-icons/fa";
import fileService from "services/file.service";
import { Status, StatusFile } from "./type";
import ListUploadedFile from "./ListUploadedFile";
import ListErrorFile from "./ListErrorFile";

interface UploadModalProp {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}
const UploadModal = ({ isOpen, onToggle, onClose }: UploadModalProp) => {
    const [processingUploadFiles, setProcessingUploadFiles] = useState<Status>({ files: [] }); // store information of processing upload files

    const [failedUploadFiles, setFailedUploadFiles] = useState<string[]>([]); // all failed files from calling api
    const [failedSizeFiles, setFailedSizeFiles] = useState<string[]>([]); // all failed files with invalid size, verify by drop-zone
    const [failedTypeFiles, setFailedTypeFiles] = useState<string[]>([]); // all failed files with invalid type, verify by drop-zone
    const [allUploadedFiles, setAllUploadedFiles] = useState<string[]>([]); // all success uploaded files

    const [disabled, setDisabled] = useState(false); // disable modal upload or not

    const statusRef = useRef<any>(null); // ref to keep track status information

    // hook dropzone
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        maxSize: 20000000, // limit 20Mb
        disabled: disabled,
        // occur when drop files to upload
        onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setDisabled(true);
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

            setProcessingUploadFiles({ files: [] });
            uploadFiles(acceptedFiles);
        },
    });

    const uploadFiles = (acceptedFiles: File[]) => {
        // init status upload info
        const initProcessingFiles = acceptedFiles.map((file) => {
            return { name: file.name, percent: 0, controller: new AbortController() } as StatusFile;
        });
        statusRef.current = {
            files: initProcessingFiles,
        };

        // define handler when upload files
        const uploadPromises = acceptedFiles.map(async (file, i) => {
            const processingFiles = [...statusRef.current.files];
            try {
                // upload file
                await fileService.upload(
                    file,
                    (event) => {
                        // update percent of upload files
                        (processingFiles[i] as StatusFile).percent = Math.round((100 * event.loaded) / event.total);
                        // filter processing files
                        const notFailedFiles = processingFiles.filter(
                            (status, index) => status.percent !== 0 
                        );
                        // update status
                        setProcessingUploadFiles({ files: notFailedFiles });
                    },
                    (processingFiles[i] as StatusFile).controller
                );
                // upload done
                setAllUploadedFiles((files) => [file.name, ...files]);
            } catch (error) {
                // upload failed
                // remove failed files of list processing
                (processingFiles[i] as StatusFile).percent = 0;
                const notFailedFiles = processingFiles.filter((file) => file.percent !== 0);
                setProcessingUploadFiles({ files: notFailedFiles });
                // add failed files to failed list
                setFailedUploadFiles((files) => [file.name, ...files]);
            }
        });

        Promise.all(uploadPromises)
            .then(() => setProcessingUploadFiles({ files: [] }))
            .finally(() => setDisabled(false));
    };

    const reset = () => {
        setAllUploadedFiles([]);
        setFailedSizeFiles([]);
        setFailedTypeFiles([]);
        setFailedUploadFiles([]);
        setProcessingUploadFiles({ files: [] });
    };

    const abortUpload = () => {
        processingUploadFiles.files.forEach((file) => {
            file.controller.abort();
        });
        onToggle();
        // need trigger timeout here to wait axios do all job then reset value
        setTimeout(() => {
            reset();
        }, 300);
    };

    return (
        <>
            {/* modal upload */}(
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent minW="50rem" maxW="70rem">
                    <ModalBody py={8}>
                        <Flex flexDir="column" gap={8}>
                            {/*Header section */}
                            <HStack justifyContent="space-evenly">
                                <Box className="special-font" fontSize="1.5rem" fontWeight="bold">
                                    Upload documents
                                </Box>

                                <Flex position="absolute" top={2} right={4}>
                                    {/* minimize button */}
                                    <IconButton
                                        onClick={onToggle}
                                        variant="ghost"
                                        size="sm"
                                        _focus={{ outline: "none" }}
                                        aria-label="Minimize popup"
                                        icon={<MinusIcon />}
                                    />
                                    {/* close button */}
                                    <IconButton
                                        onClick={abortUpload}
                                        variant="ghost"
                                        size="sm"
                                        _focus={{ outline: "none" }}
                                        aria-label="Close popup"
                                        icon={<CloseIcon />}
                                    />
                                </Flex>
                            </HStack>
                            <Divider userSelect="none" />

                            {/* Drop-Drag section */}
                            <Flex flexDir="column" gap={6}>
                                <Box textAlign="center" className="special-font">
                                    Healcheck OCR Workflow
                                </Box>
                                <Center
                                    {...getRootProps()}
                                    border="2px dashed"
                                    borderColor="gray.300"
                                    rounded="lg"
                                    cursor={disabled ? "not-allowed" : "pointer"}
                                    flexDir="column"
                                    gap={4}
                                    py={6}
                                    opacity={disabled ? 0.7 : 1}
                                >
                                    <chakra.input {...getInputProps()} />
                                    <Icon as={FaFolderOpen} width={24} height={24} color="blue.400" />
                                    {isDragActive ? (
                                        <Text className="special-font" userSelect="none">
                                            Drop the files here ...
                                        </Text>
                                    ) : (
                                        <Box userSelect="none" className="special-font" fontWeight="bold">
                                            Drag and drop your files, or
                                            <chakra.span color="blue.400" className="special-font">
                                                {" "}
                                                Browse
                                            </chakra.span>
                                        </Box>
                                    )}
                                </Center>
                            </Flex>

                            {/* Status section */}
                            <section id="grid-status-upload">
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
                            </section>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadModal;
