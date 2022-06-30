import React from "react";
import { Icon } from "react-feather";
import { IconType } from "react-icons";

export type NavigationProp = {
    path: string;
    navText: string;
    icon?: IconType | Icon;
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
    limit: number;
    page: number;
    orderBy?: OrderBy[];
}
