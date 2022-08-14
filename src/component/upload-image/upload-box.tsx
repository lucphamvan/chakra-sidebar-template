import { Box, Icon, chakra } from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";

type Props = {
    getRootProps: any;
    getInputProps: any;
};
const UploadBox = ({ getInputProps, getRootProps }: Props) => {
    return (
        <Box
            w={40}
            h={40}
            backgroundColor="#F3F7F7"
            display="flex"
            position="relative"
            justifyContent="center"
            alignItems="center"
            {...getRootProps()}
            cursor="pointer"
        >
            <chakra.input {...getInputProps()} />
            <Icon as={MdFileUpload} w="4rem" h="4rem" />
        </Box>
    );
};

export default UploadBox;
