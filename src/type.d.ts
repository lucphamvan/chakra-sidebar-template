import React from "react";
import { IconType } from "react-icons";

export type NavigationProp = {
    path: string;
    navText: string;
    icon?: IconType;
    children?: NavigationProp[];
};

export type RouteProp = {
    path: string;
    element: React.ReactNode;
};
