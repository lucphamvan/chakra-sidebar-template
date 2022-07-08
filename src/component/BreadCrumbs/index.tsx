import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useId
} from "@chakra-ui/react";
import { STYLE } from "config";

interface BreadCrumbsProp {
    path: string[];
}
const BreadCrumbs = ({ path }: BreadCrumbsProp) => {
    const id = useId();
    const listItem = path.map((name, index) => {
        const color =
            index === path.length - 1 ? "inherit" : STYLE.primaryColor;
        return (
            <BreadcrumbItem key={`${id}-${index}`}>
                <BreadcrumbLink fontWeight="semibold" color={color}>
                    {name}
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    });
    return (
        <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            {listItem}
        </Breadcrumb>
    );
};

export default BreadCrumbs;
