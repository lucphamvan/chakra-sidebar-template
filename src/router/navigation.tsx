import { FaHome, FaShieldAlt, FaUser } from "react-icons/fa";
import { NavigationProp } from "../type";

const navigation: NavigationProp[] = [
    {
        path: "/",
        navText: "Home Page",
        icon: FaHome,
        children: [
            {
                path: "/one1",
                navText: "Page Home One",
                children: [
                    {
                        path: "/oneone1",
                        navText: "Page One One",
                    },
                    {
                        path: "/oneone2",
                        navText: "Page One Two",
                    },
                ],
            },
            {
                path: "/two1",
                navText: "Page Home Two",
            },
        ],
    },
    {
        path: "/one",
        navText: "Page One",
        icon: FaShieldAlt,
    },
    {
        path: "/two",
        navText: "Page Two",
        icon: FaUser,
    },
];

export default navigation;
