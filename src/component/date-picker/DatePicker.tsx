import styled from "@emotion/styled";
import { getLocalTimeZone, now } from "@internationalized/date";
import { AriaDatePickerProps, useDatePicker } from "@react-aria/datepicker";
import { I18nProvider } from "@react-aria/i18n";
import { useDatePickerState } from "@react-stately/datepicker";
import { DateValue } from "@react-types/datepicker";
import { useRef } from "react";

import { FieldButton } from "./Button";
import { Calendar } from "./Calendar";
import { DateField, StyledField } from "./DateField";
import { Popover } from "./Popover";
import { TimeField } from "./TimeField";
import { ReactComponent as CalendarIcon } from "./icon/calendar.svg";

const InputGroup = styled.div`
    width: auto;
`;

const Wrapper = styled.div`
    position: fixed;
    z-index: 9;
`;

const StyledWrapper = styled.div`
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-bottom: 0.25rem;
    button:focus {
        outline: none !important;
        box-shadow: none !important;
    }
`;

interface Props extends AriaDatePickerProps<DateValue> {
    showTimePicker?: boolean;
}
export function DatePicker(props: Props) {
    let state = useDatePickerState({
        ...props,
        defaultValue: props.showTimePicker ? now(getLocalTimeZone()) : undefined,
        shouldCloseOnSelect: !props.showTimePicker
    });
    let ref = useRef<HTMLDivElement>(null);
    let { groupProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(
        { ...props, hideTimeZone: true },
        state,
        ref
    );

    return (
        <I18nProvider locale="en-GB">
            <StyledWrapper style={{ minWidth: props.showTimePicker ? "16.75rem" : "12.5rem" }}>
                <Wrapper>
                    <InputGroup {...groupProps} ref={ref}>
                        <StyledField style={{ width: props.showTimePicker ? "16.5rem" : "12.5rem" }}>
                            <DateField label="date-field" {...fieldProps} />
                            <FieldButton aria-label="field-button" {...buttonProps}>
                                <CalendarIcon />
                            </FieldButton>
                        </StyledField>
                    </InputGroup>
                    {state.isOpen && (
                        <Popover {...dialogProps} isOpen={state.isOpen} onClose={() => state.setOpen(false)}>
                            <Calendar {...calendarProps} />
                            {props.showTimePicker && (
                                <TimeField label="Time" value={state.timeValue} onChange={state.setTimeValue} />
                            )}
                        </Popover>
                    )}
                </Wrapper>
            </StyledWrapper>
        </I18nProvider>
    );
}
