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
    useDisclosure,
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
import Button from "component/Button";
import Card from "component/Card";
import PageHeading from "component/page-heading";
import fileService from "services/file.service";
import { Status, StatusFile } from "./type";
import UploadedFile from "./UploadedFile";
import ErrorFile from "./ErrorFile";

const FilePage = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const [successUploadFiles, setSuccessUploadFiles] = useState<Status>({ files: [] }); // store information of processing upload files

    const [failedUploadFiles, setFailedUploadFiles] = useState<string[]>([]);
    const [failedSizeFiles, setFailedSizeFiles] = useState<string[]>([]);
    const [failedTypeFiles, setFailedTypeFiles] = useState<string[]>([]);
    const [allUploadedFiles, setAllUploadedFiles] = useState<string[]>([]);
    const [disabled, setDisabled] = useState(false);

    const statusRef = useRef<any>(null); // ref to keep track status information

    // hook dropzone
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        maxSize: 20000000,
        disabled: disabled,
        // occur when drop files to upload
        onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setDisabled(true);
            // handle error file when drop at client side
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

            setFailedSizeFiles((files) => [...files, ...invalidSizeFiles]);
            setFailedTypeFiles((files) => [...files, ...invalidTypeFiles]);

            setSuccessUploadFiles({ files: [] });
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
                        const notFailedFiles = processingFiles.filter((status) => status.percent !== 0);
                        // update status
                        setSuccessUploadFiles({ files: notFailedFiles });
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
                setSuccessUploadFiles({ files: notFailedFiles });

                // add failed files to failed list
                setFailedUploadFiles((files) => [file.name, ...files]);
            }
        });

        Promise.all(uploadPromises)
            .then(() => {
                setSuccessUploadFiles({ files: [] });
            })
            .finally(() => setDisabled(false));
    };

    return (
        <>
            <PageHeading>File Management</PageHeading>

            <Card width="100%" mt={4}>
                <Button onClick={onToggle}>Upload</Button>

                {/* modal upload */}
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
                                            variant="ghost"
                                            size="sm"
                                            _focus={{ outline: "none" }}
                                            aria-label="Minimize popup"
                                            icon={<MinusIcon />}
                                        />
                                        {/* close button */}
                                        <IconButton
                                            onClick={onToggle}
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
                                        cursor="pointer"
                                        flexDir="column"
                                        gap={4}
                                        py={6}
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
                                            <UploadedFile
                                                status={successUploadFiles}
                                                allUploadedFiles={allUploadedFiles}
                                            />
                                        </GridItem>
                                        <GridItem height={"100%"}>
                                            <ErrorFile
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
            </Card>
        </>
    );
};

export default FilePage;
