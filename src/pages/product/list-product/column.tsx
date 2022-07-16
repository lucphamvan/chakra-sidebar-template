import { CheckIcon } from "@chakra-ui/icons";
import { STYLE } from "config";
import { Product } from "model/Product";
import moment from "moment";
import { Column } from "react-table";

export const columns: Column<Product>[] = [
    {
        Header: "No.",
        accessor: "no",
        width: "1%",
        disableSortBy: true
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
            return props.value.toUpperCase();
        },
        width: "20%"
    },
    {
        Header: "Price",
        accessor: "price",
        Cell: (props) => {
            return props.value + "$";
        },
        width: "10%",
        maxWidth: 80
    },
    {
        Header: "Created By",
        accessor: "user",
        Cell: (row) => row.value?.name,
        width: "20%"
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: (props) => {
            return moment(props.value).format("MMMM Do YYYY, HH:mm:ss");
        }
    },
    {
        Header: "Sold",
        accessor: "sold",
        disableSortBy: true,
        width: "10%",
        Cell: (props) => {
            return !props.value ? <CheckIcon color={STYLE.primaryColor} /> : null;
        }
    }
];
