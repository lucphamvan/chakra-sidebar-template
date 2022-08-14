import { createCalendar } from "@internationalized/date";
import { useTimeField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { forwardRef, useRef } from "react";

import { DateSegment } from "./DateField";
import { FieldBox, TimeBox } from "./TimeField.styled";

export function TimeField(props: any) {
    let { locale } = useLocale();
    let state = useTimeFieldState({
        ...props,
        locale,
        createCalendar
    });

    let ref = useRef<any>();
    let { labelProps, fieldProps } = useTimeField(props, state, ref);

    return (
        <TimeBox style={{ flex: props.flex }}>
            <label {...labelProps}>{props.label}</label>
            <StyledField {...fieldProps} ref={ref}>
                {state.segments.map((segment, i) => (
                    <DateSegment key={i} segment={segment} state={state} />
                ))}
            </StyledField>
        </TimeBox>
    );
}

const StyledField = forwardRef(({ children, ...otherProps }: any, ref: any) => {
    return (
        <FieldBox {...otherProps} ref={ref}>
            {children}
        </FieldBox>
    );
});
