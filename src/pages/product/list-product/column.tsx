import { Box } from "@chakra-ui/react";
import { Product } from "model/Product";
import moment from "moment";
import { Column } from "react-table";

import ActionButtons from "./action-buttons";

export const columns = (reload: () => void): Column<Product>[] => [
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
        id: "actions",
        Header: () => (
            <Box pl={6} display="inline">
                Actions
            </Box>
        ),
        accessor: (row) => row,
        Cell: ({ value }: { value: Product }) => {
            return <ActionButtons product={value} reload={reload} />;
        }
    }
];
