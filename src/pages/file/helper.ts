import { SortingRule } from "react-table";
import { OrderBy } from "type";

const ORDER_MAP: Record<string, string> = {
    name: "name",
    orginalName: "orginalName",
    createdAt: "createdAt",
    size: "size"
};

// function to build "orderBy" query params
export const buildOrderByQuery = (sortBy?: SortingRule<File>[]) => {
    console.log("sortby", sortBy);
    const orderBy = sortBy?.map((item) => {
        const key = ORDER_MAP[item.id];
        const value = item.desc ? "desc" : "asc";
        return { [key]: value } as OrderBy;
    });
    return orderBy;
};
