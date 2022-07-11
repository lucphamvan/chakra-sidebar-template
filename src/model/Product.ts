import { User } from "./User";

export interface Product {
    id: string;
    name: string;
    price: number;
    amount?: number;
    sold?: boolean;
    description?: string;
    userId?: string;
    imgUrl?: string;
    User?: User;
    no?: number;
    createdAt?: string;
}

export type ProductCreateInput = Omit<Product, "id">;
