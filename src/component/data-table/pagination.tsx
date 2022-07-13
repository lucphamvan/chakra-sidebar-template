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
import IconButton from "component/IconButton";
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
        <Flex m={4} alignItems="center" gap={4} d="inline-flex" flexWrap="wrap">
            <Flex>
                <Tooltip label="First Page">
                    <IconButton
                        aria-label="first page"
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        icon={<ArrowLeftIcon h={3} w={3} />}
                        mr={4}
                    />
                </Tooltip>
                <Tooltip label="Previous Page">
                    <IconButton
                        aria-label="previous page"
                        onClick={previousPage}
                        isDisabled={!canPreviousPage}
                        icon={<ChevronLeftIcon h={6} w={6} />}
                    />
                </Tooltip>
            </Flex>

            <Flex alignItems="center">
                <Text flexShrink={0} mr={8}>
                    Page{" "}
                    <Text fontWeight="bold" as="span">
                        {pageIndex + 1}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span">
                        {pageOptions.length}
                    </Text>
                </Text>
                <Text flexShrink={0}>Go to page:</Text>{" "}
                <NumberInput
                    ml={2}
                    mr={8}
                    w={28}
                    min={1}
                    max={pageOptions.length}
                    onChange={(value: any) => {
                        const page = value ? value - 1 : 0;
                        gotoPage(page);
                    }}
                    defaultValue={pageIndex + 1}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Select w={32} value={pageSize} onChange={handlePageSizeChange}>
                    {SIZE_OPTION.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Select>
            </Flex>

            <Flex>
                <Tooltip label="Next Page">
                    <IconButton
                        aria-label="next page"
                        onClick={nextPage}
                        isDisabled={!canNextPage}
                        icon={<ChevronRightIcon h={6} w={6} />}
                    />
                </Tooltip>
                <Tooltip label="Last Page">
                    <IconButton
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
