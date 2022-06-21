import { FaHome, FaShieldAlt, FaUser } from "react-icons/fa";
import { NavigationProp } from "type";

const navigation: NavigationProp[] = [
    {
        path: "/",
        navText: "Home Page",
        icon: FaHome,
    },
    {
        path: "/users",
        navText: "Users",
        icon: FaUser,
    },
    {
        path: "/setting",
        navText: "Setting",
        icon: FaShieldAlt,
    },
];

export default navigation;
