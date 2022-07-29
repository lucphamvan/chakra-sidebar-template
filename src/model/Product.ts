import { File } from "./File";
import { User } from "./User";

export interface Product {
    id: string;
    name: string;
    price: number;
    amount?: number;
    sold?: boolean;
    code?: string;
    description?: string;
    userId?: string;
    imgUrl?: string;
    user?: User;
    files?: File[];
    no?: number;
    createdAt?: string;
}

export interface ProductCreateInput extends Omit<Product, "id"> {
    fileId?: string | string[];
}

export interface ProductUpdateInput extends Omit<Partial<Product>, "id"> {
    fileId?: string | string[];
}
