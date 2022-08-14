import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { STYLE } from "config";
import React from "react";
import { useState } from "react";

interface Props {
    setSearch: Function;
    triggerSeach: Function;
    placeholder?: string;
}

const SearchInput = ({ setSearch, triggerSeach, placeholder }: Props) => {
    const [value, setValue] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(value);
            triggerSeach();
        }
    };

    return (
        <InputGroup maxW={80}>
            <InputLeftElement children={<SearchIcon color={STYLE.primaryColor} />} />
            <Input
                placeholder={placeholder}
                type="search"
                value={value}
                onChange={handleSearchChange}
                onKeyUp={handleKeyUp}
                bg="white"
            />
        </InputGroup>
    );
};

export default SearchInput;
