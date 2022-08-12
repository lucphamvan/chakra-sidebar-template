import { Box, Collapse, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import Button from "component/button";
import { DatePicker } from "date-picker";
import { MdFilter } from "react-icons/md";

const Filter = () => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <Button leftIcon={<MdFilter />}>Filter</Button>
                </PopoverTrigger>
                <PopoverContent _focus={{ boxShadow: "2xl", border: "none" }} boxShadow="2xl" border="none">
                    <PopoverBody>
                        <Box onClick={onToggle} fontWeight="bold" py={1}>
                            Update At
                        </Box>
                        <Collapse in={isOpen}>
                            <DatePicker label="date-picker" />
                        </Collapse>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};
export default Filter;
