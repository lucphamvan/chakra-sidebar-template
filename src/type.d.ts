import React from "react";
import { IconType } from "react-icons";

export type NavigationProp = {
    path: string;
    navText: string;
    icon?: IconType;
    children?: NavigationProp[];
    size?: string | number;
};

export type RouteProp = {
    path: string;
    element: React.ReactNode;
    isAuthRoute?: boolean;
    children?: RouteProp[];
};

export type OrderBy = Record<string, "desc" | "asc">;

export interface QueryParam {
    limit?: number;
    page?: number;
    search?: string;
    orderBy?: OrderBy[];
}
