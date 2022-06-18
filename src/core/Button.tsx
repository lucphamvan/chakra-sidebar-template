import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "config";

type StyledButtonProp = ButtonProps & {
    mode: "primary" | "secondary";
};

type CSSProp = {
    bgColor: string;
    bgHoverColor: string;
    boxShadowColor: string;
    color: string;
};
const buildStyledButton = (bgColor: string, bgHoverColor: string, boxShadowColor: string, color: string): CSSProp => {
    return {
        bgColor,
        bgHoverColor,
        boxShadowColor,
        color,
    };
};

const StyledButton = styled(Button)((props: StyledButtonProp) => {
    let styled: CSSProp;
    switch (props.mode) {
        case "primary":
            styled = buildStyledButton(Color.primary, Color.primaryBgHover, Color.primaryShadow, "#fff");
            break;
        default:
            styled = buildStyledButton(Color.primary, Color.primaryBgHover, Color.primaryShadow, "#fff");
            break;
    }

    return css`
        background-color: ${styled.bgColor};
        box-shadow: 0 0 10px 1px ${styled.boxShadowColor};
        color: white;
        border-radius: 0.125rem;
        font-weight: ${props.fontWeight ?? 600};
        font-family: "Source Code Pro", monospace;
        :hover {
            background-color: ${styled.bgHoverColor} !important;
        }
        :active {
            box-shadow: none !important;
        }
        :focus {
            box-shadow: 0 0 10px 1px ${styled.boxShadowColor};
            outline: none;
        }
    `;
});

export default StyledButton;
