import { Box } from "@chakra-ui/react";
import { formatPrice } from "common/helper";
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
            return (
                <Box fontWeight="bold" textTransform="capitalize">
                    {props.value}
                </Box>
            );
        },
        width: "20%"
    },
    {
        Header: "Price",
        accessor: "price",
        Cell: (props) => {
            return formatPrice(props.value);
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
            <Box pl={3} display="inline">
                Actions
            </Box>
        ),
        accessor: (row) => row,
        Cell: ({ value }: { value: Product }) => {
            return <ActionButtons product={value} reload={reload} />;
        }
    }
];
