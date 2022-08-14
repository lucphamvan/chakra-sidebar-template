import { Box, Image as ChakraImage } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { formatPrice } from "common/helper";
import ImageFallback from "component/image-fallback";
import { STYLE } from "config";
import { Product } from "model/Product";
import moment from "moment";
import { Column } from "react-table";

import ActionButtons from "./action-buttons";

const Image = styled(ChakraImage)`
    object-fit: scale-down;
    aspect-ratio: 5/3;
    width: 100%;
    background: ${STYLE.textColor};
`;

export const columns = (reload: () => void): Column<Product>[] => [
    {
        Header: "No.",
        accessor: "no",
        width: "1%",
        disableSortBy: true
    },
    {
        Header: "Image",
        accessor: "imgUrl",
        Cell: (props) => {
            return <Image src={props.value} fallback={<ImageFallback />} />;
        }
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
            return (
                <Box fontWeight="black" color={STYLE.primaryColor}>
                    {props.value}
                </Box>
            );
        },
        width: "14%"
    },
    {
        Header: "Price",
        accessor: "price",
        Cell: (props) => {
            return (
                <Box color="orangered" fontWeight="bold">
                    {formatPrice(props.value)}
                </Box>
            );
        },
        width: "10%",
        maxWidth: 80
    },
    {
        Header: "Created By",
        accessor: "user",
        Cell: (row) => row.value?.name
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
