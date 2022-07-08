import {
    FaHome,
    FaShieldAlt,
    FaUser,
    FaProductHunt,
    FaFile
} from "react-icons/fa";
import { Circle } from "react-feather";
import { NavigationProp } from "type";

const navigation: NavigationProp[] = [
    {
        path: "/",
        navText: "Home",
        icon: FaHome
    },
    {
        path: "/users",
        navText: "Users",
        icon: FaUser
    },
    {
        path: "",
        navText: "Products",
        icon: FaProductHunt,
        children: [
            {
                path: "/products",
                navText: "List",
                icon: Circle,
                size: "0.615rem"
            },
            {
                path: "/products/new",
                navText: "Create",
                icon: Circle,
                size: "0.615rem"
            }
        ]
    },
    {
        path: "/files",
        navText: "File",
        icon: FaFile
    },
    {
        path: "/setting",
        navText: "Setting",
        icon: FaShieldAlt
    }
];

export default navigation;
