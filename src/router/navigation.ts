import { FaHome, FaShieldAlt, FaUser, FaProductHunt } from "react-icons/fa";
import { Circle } from "react-feather";
import { NavigationProp } from "type";

const navigation: NavigationProp[] = [
    {
        path: "/",
        navText: "Home",
        icon: FaHome,
    },
    {
        path: "/users",
        navText: "Users",
        icon: FaUser,
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
                size: "0.615rem",
            },
        ],
    },
    {
        path: "/setting",
        navText: "Setting",
        icon: FaShieldAlt,
    },
];

export default navigation;
