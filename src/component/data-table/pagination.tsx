import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Tooltip
} from "@chakra-ui/react";
import IconButton from "component/icon-button";
import React from "react";

import { SIZE_OPTION } from "./config";
import { PaginationProp } from "./type";

const Pagination = (props: PaginationProp) => {
    const {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize
    } = props;

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    };

    return (
        <Flex m={4} alignItems="center" gap={4} display="inline-flex" flexWrap="wrap">
            {/* first + previous page */}
            <Flex>
                <Tooltip label="First Page">
                    <IconButton
                        size={["sm", "sm", "md"]}
                        aria-label="first page"
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        icon={<ArrowLeftIcon h={3} w={3} />}
                        mr={4}
                    />
                </Tooltip>
                <Tooltip label="Previous Page">
                    <IconButton
                        size={["sm", "sm", "md"]}
                        aria-label="previous page"
                        onClick={previousPage}
                        isDisabled={!canPreviousPage}
                        icon={<ChevronLeftIcon h={6} w={6} />}
                    />
                </Tooltip>
            </Flex>

            {/* page selection */}
            <Flex alignItems="center" flexWrap="wrap">
                <Text display={["none", "none", "initial"]} flexShrink={0} mr={4} size={["sm", "sm", "md"]}>
                    Page{" "}
                    <Text fontWeight="bold" as="span" size={["sm", "sm", "md"]}>
                        {pageIndex + 1}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span" size={["sm", "sm", "md"]}>
                        {pageOptions.length}
                    </Text>
                </Text>
                <Text display={["none", "none", "initial"]} flexShrink={0} mr={4} size={["sm", "sm", "md"]}>
                    Go to page:
                </Text>{" "}
                <NumberInput
                    size={["sm", "sm", "md"]}
                    w={[20, 20, 24]}
                    min={1}
                    max={pageOptions.length}
                    onChange={(value: any) => {
                        const page = value ? value - 1 : 0;
                        gotoPage(page);
                    }}
                    value={pageIndex + 1}
                    defaultValue={pageIndex + 1}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Select
                    ml={4}
                    w={[28, 28, 32]}
                    display={["none", "none", "initial"]}
                    size={["sm", "sm", "md"]}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    {SIZE_OPTION.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Select>
            </Flex>

            {/* next + last page */}
            <Flex>
                <Tooltip label="Next Page">
                    <IconButton
                        size={["sm", "sm", "md"]}
                        aria-label="next page"
                        onClick={nextPage}
                        isDisabled={!canNextPage}
                        icon={<ChevronRightIcon h={6} w={6} />}
                    />
                </Tooltip>
                <Tooltip label="Last Page">
                    <IconButton
                        size={["sm", "sm", "md"]}
                        aria-label="last page"
                        onClick={() => gotoPage(pageCount - 1)}
                        isDisabled={!canNextPage}
                        icon={<ArrowRightIcon h={3} w={3} />}
                        ml={4}
                    />
                </Tooltip>
            </Flex>
        </Flex>
    );
};
export default Pagination;
