import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { STYLE } from "config";
import React from "react";
import { useState } from "react";

interface Props {
    setSearch: Function;
    triggerSeach: Function;
}

const SearchInput = ({ setSearch, triggerSeach }: Props) => {
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
            <Input type="search" value={value} onChange={handleSearchChange} onKeyUp={handleKeyUp} />
        </InputGroup>
    );
};

export default SearchInput;
