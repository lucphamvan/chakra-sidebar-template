import { FaCircle as Circle, FaFile, FaHome, FaProductHunt, FaShieldAlt, FaUser } from "react-icons/fa";
import { NavigationProp } from "type";

const navigation: NavigationProp[] = [
    {
        path: "/",
        navText: "Home",
        icon: FaHome
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
            },
            {
                path: "/products/manage",
                navText: "Manage",
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
        path: "/users",
        navText: "Users",
        icon: FaUser
    },
    {
        path: "/setting",
        navText: "Setting",
        icon: FaShieldAlt
    }
];

export default navigation;
