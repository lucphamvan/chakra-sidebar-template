import styled from "@emotion/styled";

export const TimeBox = styled.div`
    margin-top: 0.5rem;
`;
export const FieldBox = styled.div`
    position: relative;
    background: white;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0.4rem 0.5rem;
    gap: 0.125rem;
    transition: all 200ms;
    margin-top: 0.25rem;
    width: max-content;
    :hover {
        border-color: #a0aec0;
    }
    :focus-within {
        /* border-color: #3182ce; */
        /* box-shadow: 0 0 0 1px #3182ce; */
    }
`;
