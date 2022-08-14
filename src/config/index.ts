export const STYLE = {
    background: "#F3F7F7",
    primaryColor: "#528BFF",
    primaryBgHover: "#528BFF",
    primaryShadow: "#6f9fffa6",
    primaryActive: "#528BFF",

    errorColor: "#EA5455",
    infoColor: "#00cfe8",
    warningColor: "#ff9f43",
    textColor: "#39424e",
    secondaryColor: "#738f93",

    shadowBtn: "0 4px 12px #6f9fffa6",
    shadowCard: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
    shadowErr: "0 0 10px 1px #eac2c2",
    shadowInfo: "0 0 10px 1px #c6d9dc",
    shadowWarning: "0 0 10px 1px #eedcba",

    bgSuccess: "#E5F8ED",
    bgError: "#FCEAEA",
    bgInfo: "#E0F9FC",
    bgWarning: "#FFF3E8",

    secondary: "#ffffff",
    borderRadius: "0.25rem",

    paddingBtn: "1.2rem 2rem",
    paddingTap: "0.65rem 2rem"
};

export const BREAKPOINT = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em"
};

export const MEDIA_QUERY = {
    sm: `@media (min-width: ${BREAKPOINT.sm})`,
    md: `@media (min-width: ${BREAKPOINT.md})`,
    lg: `@media (min-width: ${BREAKPOINT.lg})`,
    xl: `@media (min-width: ${BREAKPOINT.xl})`,
    "2xl": `@media (min-width: ${BREAKPOINT["2xl"]})`
};

export const MEDIA_QUERY_STRING = {
    sm: `(min-width: ${BREAKPOINT.sm})`,
    md: `(min-width: ${BREAKPOINT.md})`,
    lg: `(min-width: ${BREAKPOINT.lg})`,
    xl: `(min-width: ${BREAKPOINT.xl})`,
    "2xl": `(min-width: ${BREAKPOINT["2xl"]})`
};

export const TITLE = "Ivy Storage";

export const SPECIAL_FONT = "special_font";

export const TABLE_HEIGHT = "calc(100vh - 16rem)";
