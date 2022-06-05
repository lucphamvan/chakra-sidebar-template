import { SearchIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { isEmpty } from "@chakra-ui/utils";
import React, { useEffect, useState } from "react";

interface Option {
    text: string;
    value: string;
}

interface ListCheckboxProps {
    optionData: Option[];
    applyFunc: Function;
}

const ListCheckbox = ({ optionData, applyFunc }: ListCheckboxProps) => {
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
        <VStack spacing={2} alignItems="left" m="4">
            <InputGroup size={"sm"}>
                <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                <Input type="search" placeholder="Search" value={searchValue} onChange={onSearchChange} />
            </InputGroup>

            {renderList()}
            <Button size="sm" colorScheme="blue" onClick={onApply}>
                Apply
            </Button>
        </VStack>
    );
};

export default ListCheckbox;
