import { FaAward, FaBookDead, FaCircle, FaFile, FaShieldAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavigationProp } from "type";

const navigation: NavigationProp[] = [
    {
        path: "",
        navText: "Products",
        icon: FaShoppingCart,
        children: [
            {
                path: "/products",
                navText: "Categories",
                icon: FaCircle,
                size: "0.615rem"
            },
            {
                path: "/products/manage",
                navText: "Management",
                icon: FaCircle,
                size: "0.615rem"
            },
            {
                path: "/products/new",
                navText: "New",
                icon: FaCircle,
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
    },
    {
        path: "/reader",
        navText: "PDF reader",
        icon: FaBookDead
    },
    {
        path: "/test",
        navText: "Test",
        icon: FaAward
    }
];

export default navigation;
