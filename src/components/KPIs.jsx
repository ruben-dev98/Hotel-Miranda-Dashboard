import styled from "styled-components";

const KPIsStyled = styled.div`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 12px;
    gap: 32px;
    padding: 0rem 32px;

    &:hover {
        box-shadow: 0px 16px 30px #00000014;

        div {
            background-color: #E23428;

            svg {
                fill: #FFF;
                stroke: #FFF;
            }
        }
    }
`;

const TextStyled = styled.span`
    color: #393939;
    font-family: 'Courier New', Courier, monospace;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0px;
`;

const TextStyledVar = styled(TextStyled)`
    color: #787878;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0px;
`;

const IconStyled = styled.div`
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFEDEC;

    svg {
        width: 28px;
        height: 28px;
        fill: #E23428;
        stroke: #E23428;
    }
    

    
`;

const KPIs = ({ icon, number, text }) => {

    return (
        <KPIsStyled>
            <IconStyled>{icon}</IconStyled>
            <p>
                <TextStyled>{number}</TextStyled><br />
                <TextStyledVar>{text}</TextStyledVar>
            </p>
        </KPIsStyled>
    )
}

export default KPIs;

