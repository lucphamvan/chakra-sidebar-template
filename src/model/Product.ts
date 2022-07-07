import { User } from "./User";

export interface Product {
    id: string;
    name: string;
    price: number;
    sold: boolean;
    description?: string;
    userId?: string;
    imgUrl?: string;
    User?: User;
    no?: number;
}
