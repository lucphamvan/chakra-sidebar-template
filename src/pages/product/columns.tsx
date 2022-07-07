import { CheckIcon } from "@chakra-ui/icons";
import { Color } from "config";
import { Product } from "model/Product";
import { Column } from "react-table";

export const columns: Column<Product>[] = [
    {
        Header: "No.",
        accessor: "no",
        width: "1%",
        disableSortBy: true,
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
            return props.value.toUpperCase();
        },
        width: "20%",
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
        width: "10%",
        maxWidth: 80,
    },
    {
        Header: "Created By",
        accessor: "User",
        Cell: (row) => row.value?.name,
        width: "20%",
    },
    {
        Header: "Sold",
        accessor: "sold",
        disableSortBy: true,
        width: "10%",
        Cell: (props) => {
            return !props.value ? <CheckIcon color={Color.primary} /> : null;
        },
    },
];
