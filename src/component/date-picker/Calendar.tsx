import styled from "@emotion/styled";
import { createCalendar } from "@internationalized/date";
import { CalendarProps, useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import { DateValue } from "@react-types/calendar";
import { useRef } from "react";

import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ReactComponent as ChevronLeftIcon } from "./icon/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./icon/chevron-right.svg";

const Box = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
`;

const Heading = styled.h2`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
`;

export function Calendar(props: CalendarProps<DateValue>) {
    let { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar
    });

    let ref = useRef<HTMLDivElement>(null);
    let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

    return (
        <div {...calendarProps} ref={ref}>
            <Box>
                <CalendarButton {...prevButtonProps}>
                    <ChevronLeftIcon width="1rem" height="1rem" />
                </CalendarButton>
                <Heading>{title}</Heading>
                <CalendarButton {...nextButtonProps}>
                    <ChevronRightIcon width="1rem" height="1rem" />
                </CalendarButton>
            </Box>
            <CalendarGrid state={state} />
        </div>
    );
}
