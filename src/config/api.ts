export const API = {
    PERMISSION: "/permissions",
    ROLE: {
        ROLES: "roles"
    },
    USER: {
        USERS: "users",
        LOGIN: "users/login",
        LOGOUT: "users/logout",
        AUTHEN: "users/me",
        ASSIGN_ROLE: "users/assign-role",
        REFRESH_TOKEN: "users/refresh-token",
        CHECK_EMAIL: "users/check"
    },
    PRODUCT: {
        PRODUCTS: "products"
    },
    FILE: {
        FILES: "files",
        UPLOAD: "files/upload",
        DOWNLOAD: "files/download/"
    }
};

export const IMG_DOMAIN = `${process.env.REACT_APP_API_ENDPOINT}`;
