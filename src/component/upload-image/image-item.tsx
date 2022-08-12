import { Box, Image, useDisclosure } from "@chakra-ui/react";
import { Popover, PopoverContent, PopoverTrigger } from "component/popover";
import { MdEdit } from "react-icons/md";
import { LeftRibbon, RibbonContainer } from "react-ribbons";

import { IconWrapper, ImgBox, MenuIcon, MenuItem } from "./index.styled";

interface ImageItemProps {
    src: string;
    index: number;
    primaryIndex: number | undefined;
    handleRemoveImg: Function;
    handleSetPrimaryImgIndex: Function;
}
const ImageItem = ({ src, index, primaryIndex, handleRemoveImg, handleSetPrimaryImgIndex }: ImageItemProps) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const isPrimary = index === primaryIndex;
    return (
        <RibbonContainer className="custom-class">
            <ImgBox>
                <Image bg="gray.100" src={src} objectFit="scale-down" boxSize="40" />
                <IconWrapper>
                    <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose}>
                        <PopoverTrigger>
                            <MenuIcon
                                onClick={onToggle}
                                aria-label="menu"
                                fontSize={16}
                                icon={<MdEdit strokeWidth={2} color="#fff" />}
                            />
                        </PopoverTrigger>
                        <PopoverContent width={40}>
                            <Box p={2}>
                                <MenuItem onClick={() => handleRemoveImg(index, onToggle)}>Delete</MenuItem>
                                <MenuItem onClick={() => handleSetPrimaryImgIndex(index, onToggle)}>Primary</MenuItem>
                            </Box>
                        </PopoverContent>
                    </Popover>
                </IconWrapper>
            </ImgBox>
            {isPrimary && (
                <LeftRibbon backgroundColor="#448812" color="#f0f0f0" fontFamily="Arial">
                    Primary
                </LeftRibbon>
            )}
        </RibbonContainer>
    );
};
export default ImageItem;
