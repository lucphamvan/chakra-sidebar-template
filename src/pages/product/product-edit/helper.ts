import { Product } from "model/Product";

export const getProductImgUrl = (product?: Product) => {
    const items = product?.files?.map((file) => {
        return file.url;
    });
    return items;
};
