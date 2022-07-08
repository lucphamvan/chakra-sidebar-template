import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { STYLE } from "config";

type StyledButtonProp = ButtonProps & {
    mode?: "primary" | "secondary";
};

type CSSProp = {
    bgColor: string;
    bgHoverColor: string;
    boxShadow: string;
    color: string;
};

const buildStyledButton = (
    bgColor: string,
    bgHoverColor: string,
    boxShadow: string,
    color: string
): CSSProp => {
    return {
        bgColor,
        bgHoverColor,
        boxShadow,
        color
    };
};

const Button = styled(ChakraButton)(
    ({ mode = "primary", ...props }: StyledButtonProp) => {
        let styled: CSSProp;
        switch (mode) {
            case "primary":
                styled = buildStyledButton(
                    STYLE.primaryColor,
                    STYLE.primaryBgHover,
                    STYLE.shadowBtn,
                    "#fff"
                );
                break;
            case "secondary":
                styled = buildStyledButton(
                    STYLE.secondary,
                    STYLE.secondary,
                    STYLE.shadowBtn,
                    STYLE.primaryColor
                );
                break;
            default:
                styled = buildStyledButton(
                    STYLE.primaryColor,
                    STYLE.primaryBgHover,
                    STYLE.shadowBtn,
                    "#fff"
                );
                break;
        }
        return css`
            background-color: ${styled.bgColor};
            color: ${styled.color};

            font-weight: ${props.fontWeight ?? 600};
            font-family: "Source Code Pro", monospace;

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
    }
);

export default Button;
