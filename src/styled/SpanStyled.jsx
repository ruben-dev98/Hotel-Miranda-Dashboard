import styled from "styled-components";

export const SpanStyled = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background-color: #5AD07A;
    border-radius: 20px;
    width: 100px;
    height: 50px;
    border: 0rem;
`;

export const SpanStyledCheckIn = styled(SpanStyled)`
    background-color: #5AD07A;
`;

export const SpanStyledCheckOut = styled(SpanStyled)`
    background-color: #E23428;
`;

export const SpanStyledInProgress = styled(SpanStyled)`
    color: #393939;
    background-color: #FF9C3A;
`;

export const SpanStyledCancelled = styled(SpanStyled)`
    color: #FFF;
    background-color: #575757;
`;

export const SpanStyledTableSecond = styled.span`
    color: #799283;
    font-size: 1rem;
`;

export const SpanStyledTableFirst = styled.span`
    color: #393939;
    font-size: 1.2rem;
`;