import styled from "@emotion/styled";
import { CalendarDate, DateValue, isSameMonth } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

const Box = styled.td`
    text-align: center;
`;

interface BtnProp {
    isSelected: boolean;
}
const Button = styled.button<BtnProp>`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    background: ${(props) => (props.isSelected ? "#3182CE" : "initial")};
    color: ${(props) => (props.isSelected ? "#ffffff" : "#17539c")};
    font-weight: 500;
    :hover {
        background: ${(props) => (props.isSelected ? "#3182CE" : "#ebf8ff")};
    }
`;

interface Props {
    state: CalendarState;
    date: CalendarDate;
    currentMonth: DateValue;
}
export function CalendarCell({ state, date, currentMonth }: Props) {
    let ref = useRef<HTMLButtonElement>(null);

    let { cellProps, buttonProps, isSelected, formattedDate } = useCalendarCell({ date }, state, ref);

    let isOutsideMonth = !isSameMonth(currentMonth, date);

    return (
        <Box {...cellProps}>
            <Button {...buttonProps} ref={ref} hidden={isOutsideMonth} isSelected={isSelected}>
                {formattedDate}
            </Button>
        </Box>
    );
}
