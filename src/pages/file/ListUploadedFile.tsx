import { Grid, GridItem, Flex, Progress, IconButton, chakra } from "@chakra-ui/react";
import { Fragment } from "react";
import { ReactComponent as XCircleIcon } from "assets/x-circle.svg";
import { FaCheckCircle } from "react-icons/fa";
import { Status } from "./type";

interface UploadedFileProp {
    processingUploadFiles: Status;
    allUploadedFiles: string[];
}

const UploadedFile = ({ processingUploadFiles, allUploadedFiles }: UploadedFileProp) => {
    const processingItemFiles = processingUploadFiles?.files.map((info, index) => {
        const cancelAxios = () => {
            info.controller.abort();
        };

        return (
            <Fragment key={`fr-${index}`}>
                <GridItem alignItems="center" className="special-font" noOfLines={1}>
                    {info.name}
                </GridItem>
                <GridItem alignItems="center">
                    <Flex alignItems="center" width="100%" gap={4}>
                        <Progress width="100%" rounded="full" value={info.percent} />
                        <IconButton
                            onClick={cancelAxios}
                            aria-label="cancel"
                            fontSize="24px"
                            color="blue.400"
                            icon={<XCircleIcon />}
                            variant="ghost"
                            _focus={{ boxShadow: "none" }}
                        />
                    </Flex>
                </GridItem>
            </Fragment>
        );
    });

    const allUploadedItemsFiles = allUploadedFiles?.map((item, index) => {
        return (
            <Fragment key={`frs-${index}`}>
                <GridItem alignItems="center" className="special-font" noOfLines={1}>
                    {item}
                </GridItem>
                <GridItem alignItems="center">
                    <Flex alignItems="center" width="100%" gap={4}>
                        <Progress width="100%" rounded="full" value={100} />
                        <IconButton
                            aria-label="cancel"
                            fontSize="22px"
                            color="green.400"
                            icon={<FaCheckCircle />}
                            variant="ghost"
                            _focus={{ boxShadow: "none" }}
                        />
                    </Flex>
                </GridItem>
            </Fragment>
        );
    });

    const isDisplay = processingUploadFiles?.files?.length || allUploadedFiles?.length;

    if (!isDisplay) {
        return null;
    }

    return (
        <chakra.fieldset
            height="100%"
            border="1px solid"
            borderColor="green.400"
            rounded="lg"
            maxH="15rem"
            overflow="auto"
        >
            <chakra.legend color="green.400" fontWeight="bold" ml={4} px={4}>
                Uploaded files
            </chakra.legend>
            <Grid templateColumns="minmax(0, 1fr) minmax(0, 1fr)" alignItems="center" columnGap={12} rowGap={4} p={4}>
                {processingItemFiles}
                {allUploadedItemsFiles}
            </Grid>
        </chakra.fieldset>
    );
};
export default UploadedFile;
