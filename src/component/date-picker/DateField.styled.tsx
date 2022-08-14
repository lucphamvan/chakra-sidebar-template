import styled from "@emotion/styled";

export const SegmentBox = styled.div<any>`
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: end;
    outline: none;
    border-radius: 4px;
    color: ${(props) => (props.segment.isPlaceholder ? "#718096" : !props.segment.isEditable ? "#4A5568" : "black")};
    :focus {
        background: #3182ce;
        color: white;
    }
`;

export const FieldBox = styled.div`
    position: relative;
    background: white;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0.4rem 0.5rem;
    justify-content: space-between;
    gap: 0.5rem;
    /* width: 12.5rem; */
    transition: all 200ms;
    :hover {
        border-color: #a0aec0;
    }
    :focus-within {
        /* border-color: #3182ce; */
        /* box-shadow: 0 0 0 1px #3182ce; */
    }
`;
export const DateBox = styled.div`
    display: flex;
`;
