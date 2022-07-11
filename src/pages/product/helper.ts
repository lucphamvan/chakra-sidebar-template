import { Product } from "model/Product";
import { SortingRule } from "react-table";
import { OrderBy } from "type";

const ORDER_MAP: Record<string, string> = {
    name: "name",
    description: "description",
    price: "price",
    createdAt: "createdAt"
};

// function to build "orderBy" query params
export const buildOrderByQuery = (sortBy?: SortingRule<Product>[]) => {
    console.log("sortby", sortBy);
    const orderBy = sortBy?.map((item) => {
        const key = ORDER_MAP[item.id];
        const value = item.desc ? "desc" : "asc";
        return { [key]: value } as OrderBy;
    });
    return orderBy;
};
