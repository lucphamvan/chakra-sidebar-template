import { Grid, GridItem, chakra, Box, Divider } from "@chakra-ui/react";
import { Fragment } from "react";
import ErrorItem from "./ErrorItem";

const ErrorTypeItem = ({ name }: { name: string }) => (
    <GridItem colSpan={2} py={2}>
        <Box className="special-font" color="gray.400">
            {name}
        </Box>
        <Divider />
    </GridItem>
);

interface ErrorFileProp {
    failedUploadFiles: string[];
    failedSizeFiles?: string[];
    failedTypeFiles?: string[];
}

const ErrorFile = ({ failedUploadFiles, failedSizeFiles, failedTypeFiles }: ErrorFileProp) => {
    const failedUploadItems = (
        <Fragment>
            {failedUploadFiles && failedUploadFiles?.length > 0 && <ErrorTypeItem name="File upload failed" />}
            {failedUploadFiles?.map((file, index) => (
                <ErrorItem name={file} key={`err-${index}`} />
            ))}
        </Fragment>
    );

    const failedSizeItems = (
        <Fragment>
            {failedSizeFiles && failedSizeFiles.length > 0 && <ErrorTypeItem name="File size is over 20MB" />}
            {failedSizeFiles?.map((name, index) => (
                <ErrorItem name={name} key={`errs-${index}`} />
            ))}
        </Fragment>
    );

    const failedTypeItems = (
        <Fragment>
            {failedTypeFiles && failedTypeFiles.length > 0 && <ErrorTypeItem name="File not receiving format" />}
            {failedTypeFiles?.map((name, index) => (
                <ErrorItem name={name} key={`errt-${index}`} />
            ))}
        </Fragment>
    );

    return (
        <chakra.fieldset
            height="100%"
            border="1px solid"
            borderColor="red.300"
            rounded="lg"
            maxH="15rem"
            overflow="auto"
        >
            <chakra.legend color="red.400" fontWeight="bold" ml={4} px={4}>
                Error files
            </chakra.legend>
            <Grid templateColumns="minmax(0, 1fr) minmax(0, 1fr)" alignItems="center" columnGap={12} rowGap={4} p={4}>
                {failedUploadItems}
                {failedSizeItems}
                {failedTypeItems}
            </Grid>
        </chakra.fieldset>
    );
};

export default ErrorFile;
