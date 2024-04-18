import { styled } from "styled-components";

export const SpanStyled = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme && props.theme.main};
    background-color: ${props => props.theme && props.theme.check};
    border-radius: 20px;
    width: 100px;
    height: 50px;
    border: 0rem;
`;

export const SpanStyledCheckIn = styled(SpanStyled)`
    background-color: ${props => props.theme && props.theme.check};
`;

export const SpanStyledCheckOut = styled(SpanStyled)`
    background-color: ${props => props.theme && props.theme.secondary};
`;

export const SpanStyledInProgress = styled(SpanStyled)`
    color: ${props => props.theme && props.theme.text_main_alternative};
    background-color: ${props => props.theme && props.theme.in_progress};
`;

export const SpanStyledTableSecond = styled.span`
    color: ${props => props.theme && props.theme.separator};
    font-size: 1rem;
`;

export const SpanStyledTableFirst = styled.span`
    color: ${props => props.theme && props.theme.text_main_alternative};
    font-size: 1.2rem;
`;

export const SpanStyledDetailsLabel = styled(SpanStyledTableSecond)`
    color: ${props => props.theme && props.theme.label_details};
`;

export const SpanStyledDetailsValue = styled(SpanStyledTableFirst)`
    color: ${props => props.theme && props.theme.value_details};
`;

export const SpanStyledDetailsTitle = styled(SpanStyledDetailsValue)`
    font-size: 2.5rem;
`;

export const SpanSwiperTitle = styled.span`
        color: #FFF;
        font-size: 1.3rem;
`

export const SpanSwiper = styled.span`
        color: ${props => props.theme && props.theme.swiper};
        font-size: 0.8rem;
`

export const SpanStyledInProgressLegend = styled(SpanStyledInProgress)`
    width: 200px;
`;

export const SpanStyledCheckInLegend = styled(SpanStyledCheckIn)`
    width: 200px;
`;

export const SpanStyledCheckOutLegend = styled(SpanStyledCheckOut)`
    width: 200px;
`;