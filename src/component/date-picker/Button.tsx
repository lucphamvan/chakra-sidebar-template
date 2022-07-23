import styled from "@emotion/styled";
import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { useRef } from "react";

const StyledCalendarBtn = styled.button`
    background: #edf2f7;
    padding: 0.5rem 0.75rem;
    border-radius: 0.325rem;
    :hover {
        background: #e2e8f0;
    }
`;

const StyledFieldBtn = styled(StyledCalendarBtn)`
    background-color: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.5rem;
`;

export function CalendarButton(props: AriaButtonProps) {
    let ref = useRef<HTMLButtonElement>(null);
    let { buttonProps } = useButton(props, ref);
    return (
        <StyledCalendarBtn type="button" {...buttonProps} ref={ref}>
            {props.children}
        </StyledCalendarBtn>
    );
}

export function FieldButton(props: AriaButtonProps) {
    let ref = useRef<HTMLButtonElement>(null);
    let { buttonProps } = useButton(props, ref);
    return (
        <StyledFieldBtn {...buttonProps} ref={ref}>
            {props.children}
        </StyledFieldBtn>
    );
}
