import { CheckIcon } from "@chakra-ui/icons";
import { Color } from "config";
import { Product } from "model/Product";
import { Column } from "react-table";

export const columns: Column<Product>[] = [
    {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
            return props.value.toUpperCase();
        },
    },
    {
        Header: "Description",
        accessor: "description",
    },
    {
        Header: "Price",
        accessor: "price",
        Cell: (props) => {
            return props.value + "$";
        },
    },
    {
        Header: "Sold",
        accessor: "sold",
        disableSortBy: true,
        Cell: (props) => {
            return !props.value ? <CheckIcon color={Color.primary} /> : null;
        },
    },
];
