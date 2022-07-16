import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { STYLE } from "config";

type CssProps = {
    bgColor: string;
    bgHoverColor: string;
    boxShadow: string;
    color: string;
};
const buildStyledButton = (bgColor: string, bgHoverColor: string, boxShadow: string, color: string): CssProps => {
    return {
        bgColor,
        bgHoverColor,
        boxShadow,
        color
    };
};

type Props = ButtonProps & {
    mode?: "primary" | "secondary";
};
const Button = styled(ChakraButton)(({ mode = "primary", ...props }: Props) => {
    let styled: CssProps;
    switch (mode) {
        case "primary":
            styled = buildStyledButton(STYLE.primaryColor, STYLE.primaryBgHover, STYLE.shadowBtn, "#fff");
            break;
        case "secondary":
            styled = buildStyledButton(STYLE.secondary, STYLE.secondary, STYLE.shadowBtn, STYLE.primaryColor);
            break;
        default:
            styled = buildStyledButton(STYLE.primaryColor, STYLE.primaryBgHover, STYLE.shadowBtn, "#fff");
            break;
    }
    return css`
        background-color: ${styled.bgColor};
        color: ${styled.color};

        font-weight: ${props.fontWeight ?? 600};
        /* font-family: "Source Code Pro", monospace; */

        border-radius: 0.125rem;
        border: 2px solid ${STYLE.primaryColor};

        box-shadow: ${styled.boxShadow};

        :hover {
            background-color: ${styled.bgHoverColor} !important;
        }

        :active {
            box-shadow: none !important;
        }

        :focus {
            box-shadow: ${styled.boxShadow};
            outline: none;
        }
    `;
});

export default Button;
