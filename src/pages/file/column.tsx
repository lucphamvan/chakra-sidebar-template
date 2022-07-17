import { Box } from "@chakra-ui/react";
import { File } from "model/File";
import moment from "moment";
import { Column } from "react-table";

import ActionButtons from "./action-buttons";

export const generateColumn = (reload: () => void): Column<File>[] => [
    {
        Header: "Name",
        accessor: "orginalName"
    },
    {
        Header: "Size",
        accessor: "size",
        Cell: ({ value }) => {
            return value + " KB";
        }
    },
    {
        Header: "Uploaded By",
        accessor: "user",
        Cell: ({ value }) => {
            return value.name;
        }
    },
    {
        Header: "Uploaded At",
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
        Cell: ({ value }: { value: File }) => {
            return <ActionButtons file={value} reload={reload} />;
        }
    }
];
