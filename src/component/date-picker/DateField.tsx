import { createCalendar } from "@internationalized/date";
import { AriaDateFieldProps, useDateField, useDateSegment } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { DateSegment as AriaDateSegment, DateFieldState, useDateFieldState } from "@react-stately/datepicker";
import { DateValue } from "@react-types/datepicker";
import { forwardRef, useRef } from "react";

import { DateBox, FieldBox, SegmentBox } from "./DateField.styled";

export function DateField(props: AriaDateFieldProps<DateValue>) {
    let { locale } = useLocale();
    let state = useDateFieldState({
        ...props,
        locale,
        createCalendar
    });

    let ref = useRef<HTMLDivElement>(null);
    let { fieldProps } = useDateField(props, state, ref);

    return (
        <DateBox {...fieldProps} ref={ref}>
            {state.segments.map((segment, i) => (
                <DateSegment key={i} segment={segment} state={state} />
            ))}
        </DateBox>
    );
}

export const StyledField = forwardRef(({ children, ...otherProps }: any, ref: any) => {
    return (
        <FieldBox {...otherProps} ref={ref}>
            {children}
        </FieldBox>
    );
});

interface DateSegmentProps {
    segment: AriaDateSegment;
    state: DateFieldState;
}
export function DateSegment({ segment, state }: DateSegmentProps) {
    let ref = useRef<HTMLDivElement>(null);
    let { segmentProps } = useDateSegment(segment, state, ref);

    return (
        <SegmentBox
            {...segmentProps}
            ref={ref}
            style={{
                ...segmentProps.style,
                fontVariantNumeric: "tabular-nums",
                boxSizing: "content-box"
            }}
            segment={segment}
        >
            {segment.text}
        </SegmentBox>
    );
}
