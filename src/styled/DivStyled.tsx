import { styled } from "styled-components";

export const DivStyledActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const DivDetailsComponents = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`;

export const DivDetailsComponentsSeparator = styled(DivDetailsComponents)`
    border-bottom: 2px solid ${props => props.theme && props.theme.separator};
`;

export const DivDetails = styled.div`
    border-radius: 10px;
    background-color: ${props => props.theme && props.theme.main};
    display: flex;
    gap: 50px;
`;

export const DivDetailsPart = styled.div`
    width: 50%;
    position: relative;

    & > img {
        width: 100%;
        height: 100%;
    }
`;

export const DivDetailsPartFirst = styled(DivDetailsPart)`
    padding: 32px;
`;

export const DivDetailsSwiper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 2;
    bottom: 0px;
    background: rgb(0, 0, 0, 0.4);
    height: 130px;
`;

export const DivDetailsSwiperLegend = styled.div`
    position: absolute;
    transform: rotate(45deg);
    
    top: 55px;
    left: auto;
    right: -20px;
    z-index: 2;
`;

export const DivDetailsContent = styled.div`
    width: 80%; 
    margin: 0px auto; 
    padding-top: 20px;
`;

export const WindowStyled = styled.div<{$visibleLateral?: boolean}>`
    background-color: ${props => props.theme && props.theme.main};
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: .01fr 1fr;
    grid-template-areas: ${props => props.$visibleLateral ? 
    `'sidebar header'
    'sidebar content'`
    :
    `'header header'
    'content content'`};

    
`;

export const DivStyledOptions = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const SectionContent = styled.section`
    grid-area: content;
    padding: 2rem;
    background-color: ${props => props.theme && props.theme.bg};
    min-height: calc(100% - 91px);
`;

export const DivStyledKPIs = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
    margin-bottom: 40px;
`;