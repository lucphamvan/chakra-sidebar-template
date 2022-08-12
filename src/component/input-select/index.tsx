import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Checkbox,
    Flex,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import IconButton from "component/icon-button";
import { STYLE } from "config";
import { isEmpty } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { Option } from "./type";

const Container = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.25rem;
    border: solid 1px #e2e8f0;
    width: 100%;
    border-radius: ${STYLE.borderRadius};
`;

const SelectWrapper = styled(Flex)`
    background: #dce4e4;
    border-radius: 3px;
    padding: 0.125rem 0.5rem;
    padding-right: 0.125rem;
    font-size: 14px;
    align-items: center;
    gap: 2px;
`;

const Icon = styled(IconButton)`
    justify-content: center;
    display: flex;
    color: var(--chakra-colors-gray-500);
    &:hover {
        color: var(--chakra-colors-gray-700);
    }
`;

const isExist = (listOptions: Option[], option: Option) => {
    const found = listOptions.find((o) => o.text === option.text && o.value === option.value);
    return !!found;
};

interface Props {
    inputOptions: Option[];
    selectedOptions: Option[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const InputSelect: FC<Props> = ({ inputOptions, selectedOptions, setSelectedOptions }: Props) => {
    const [options, setOptions] = useState<Option[]>([]);

    const [search, setSearch] = useState("");
    const { isOpen, onToggle, onClose } = useDisclosure();

    useEffect(() => {
        if (isEmpty(inputOptions)) {
            return;
        }
        let _options = [...inputOptions];
        if (search) {
            _options = inputOptions.filter((option) =>
                option.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            );
        }
        setOptions(_options);
    }, [search, inputOptions]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, option: Option) => {
        if (e.target.checked) {
            setSelectedOptions((selectedOptions) => [...selectedOptions, option]);
        } else {
            setSelectedOptions((selectedOptions) => {
                return selectedOptions.filter((c) => c.value !== option.value || c.text !== option.text);
            });
        }
    };

    const ListOptions = useMemo(() => {
        const listOptions = options?.map((option: any, index: number) => {
            return (
                <Checkbox
                    key={`option-${index}`}
                    isChecked={isExist(selectedOptions, option)}
                    value={option.value}
                    colorScheme="primary"
                    onChange={(e) => handleCheckboxChange(e, option)}
                >
                    {option.text}
                </Checkbox>
            );
        });
        return listOptions;
    }, [options, selectedOptions, handleCheckboxChange]);

    const handleUnselect = (e: React.MouseEvent<HTMLDivElement>, option: Option) => {
        e.stopPropagation();
        setSelectedOptions((options) => {
            return options.filter((c) => c.value !== option.value || c.text !== option.text);
        });
    };

    const unselectAll = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedOptions([]);
    };

    const ListSelected = useMemo(() => {
        return selectedOptions.map((option, i) => {
            return (
                <SelectWrapper key={`selected-${i}`}>
                    <Box>{option.text}</Box>
                    <Flex p={1} alignItems="center" cursor="pointer" onClick={(e) => handleUnselect(e, option)}>
                        <SmallCloseIcon color="gray.500" />
                    </Flex>
                </SelectWrapper>
            );
        });
    }, [selectedOptions, handleUnselect]);

    return (
        <Popover matchWidth isOpen={isOpen} onClose={onClose} closeOnBlur={true}>
            <PopoverTrigger>
                <Container onClick={onToggle}>
                    <Flex padding={2} flexWrap="wrap" gap={2} w="100%">
                        {!selectedOptions.length && <Box px={2}>Select ...</Box>}
                        {ListSelected}
                    </Flex>
                    <Flex h={6} alignItems="center">
                        <Icon
                            fontSize={10}
                            variant="unstyled"
                            aria-label="clear-all-option"
                            icon={<CloseIcon />}
                            onClick={unselectAll}
                        />
                        <Box w="1px" h={6} bg="gray.500" />
                        <Icon fontSize={14} variant="unstyled" aria-label="select-option" icon={<FaChevronDown />} />
                    </Flex>
                </Container>
            </PopoverTrigger>
            <PopoverContent w="100%" placeContent="flex-start">
                <Box p={2}>
                    <Input size={"sm"} type="search" placeholder="Search" value={search} onChange={onSearchChange} />
                </Box>
                <VStack px={3} py={1} spacing={3} alignItems="left" maxH={60} overflow="auto">
                    {ListOptions}
                </VStack>
            </PopoverContent>
        </Popover>
    );
};

export default InputSelect;
