import { Flex, Grid, GridItem, IconButton, Progress, chakra } from "@chakra-ui/react";
import { STYLE } from "config";
import { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { ReactComponent as XCircleIcon } from "assets/x-circle.svg";

import { Status } from "./type";

const FinishIcon = () => (
    <IconButton
        aria-label="finished"
        fontSize="22px"
        color="green.400"
        cursor="default"
        icon={<FaCheckCircle />}
        variant="ghost"
        _focus={{ boxShadow: "none" }}
        _hover={{ background: "none" }}
        _active={{ background: "none" }}
    />
);

interface UploadedFileProp {
    processingUploadFiles: Status;
    allUploadedFiles: string[];
}

const UploadedFile = ({ processingUploadFiles, allUploadedFiles }: UploadedFileProp) => {
    const processingItemFiles = processingUploadFiles?.files.map((info, index) => {
        const cancelAxios = () => {
            info.controller.abort();
        };

        const icon = info.finished ? (
            <FinishIcon />
        ) : (
            <IconButton
                onClick={cancelAxios}
                aria-label="cancel"
                fontSize="24px"
                color="blue.400"
                icon={<XCircleIcon />}
                variant="ghost"
                _focus={{ boxShadow: "none" }}
            />
        );

        return (
            <Fragment key={`fr-${index}`}>
                <GridItem alignItems="center" className="special-font" noOfLines={1}>
                    {info.name}
                </GridItem>
                <GridItem alignItems="center">
                    <Flex alignItems="center" width="100%" gap={4}>
                        <Progress width="100%" rounded="full" value={info.percent} />
                        {icon}
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
                        <FinishIcon />
                    </Flex>
                </GridItem>
            </Fragment>
        );
    });

    return (
        <chakra.fieldset
            height="100%"
            border="1px solid"
            borderColor="green.400"
            rounded="lg"
            maxH="15rem"
            overflow="auto"
        >
            <chakra.legend color={STYLE.primaryColor} fontWeight="bold" ml={4} px={4}>
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
