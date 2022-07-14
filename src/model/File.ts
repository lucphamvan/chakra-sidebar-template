import { User } from "model/User";

export interface File {
    id: string;
    name: string;
    orginalName: string;
    size?: number;
    url: string;
    user: User;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
