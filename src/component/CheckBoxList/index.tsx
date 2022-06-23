import { SearchIcon } from "@chakra-ui/icons";
import { Checkbox, Input, InputGroup, InputLeftElement, StackProps, VStack } from "@chakra-ui/react";
import { isEmpty } from "@chakra-ui/utils";
import Button from "core/Button";
import React, { useEffect, useState } from "react";

interface Option {
    text: string;
    value: string;
}

interface ListCheckboxProps {
    optionData: Option[];
    applyFunc: Function;
    hideSearch?: boolean;
}

const ListCheckbox = ({ optionData, applyFunc, hideSearch, ...props }: ListCheckboxProps & StackProps) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const [searchValue, setSearchValues] = useState("");
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        if (isEmpty(optionData)) {
            return;
        }
        let defaultOptions = [...optionData];
        if (searchValue) {
            defaultOptions = defaultOptions.filter((option) => option.text.includes(searchValue));
        }
        setOptions(defaultOptions);
    }, [optionData, searchValue]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, option: any) => {
        if (e.target.checked) {
            setCheckedValues((values) => [...values, option.value]);
        } else {
            setCheckedValues((values) => {
                return values.filter((c: any) => c !== option.value);
            });
        }
    };

    const renderList = () => {
        const listCheckbox = options?.map((option: any, index: number) => {
            return (
                <Checkbox
                    key={`option-${index}`}
                    isChecked={checkedValues?.includes(option.value)}
                    value={option.value}
                    colorScheme="green"
                    onChange={(e) => handleCheckboxChange(e, option)}
                >
                    {option.text}
                </Checkbox>
            );
        });
        return listCheckbox;
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValues(e.target.value);
    };

    const onApply = () => {
        applyFunc(checkedValues);
    };

    return (
        <VStack spacing={2} alignItems="left" {...props}>
            {!hideSearch && (
                <InputGroup size={"sm"}>
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input type="search" placeholder="Search" value={searchValue} onChange={onSearchChange} />
                </InputGroup>
            )}

            {renderList()}
            <Button colorScheme="green" onClick={onApply} mode={"primary"}>
                Apply
            </Button>
        </VStack>
    );
};

export default ListCheckbox;
