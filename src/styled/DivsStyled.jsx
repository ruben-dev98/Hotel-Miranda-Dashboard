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
    border-bottom: 2px solid #799283;
`;

export const DivDetails = styled.div`
    border-radius: 10px;
    background-color: #FFF;
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
    background-color: rgb(0, 0, 0, 0.4);
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

export const WindowStyled = styled.div`
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 10% 90%;
    grid-template-areas: ${props => props.$visibleLateral ? 
    `'sidebar header'
    'sidebar content'`
    :
    `'header header'
    'content content'`};

    
`;