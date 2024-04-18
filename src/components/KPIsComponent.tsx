import styled from "styled-components";
import { ReactNode } from "react";

const KPIsStyled = styled.div`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.theme && props.theme.main};
    border-radius: 12px;
    gap: 32px;
    padding: 0rem 32px;

    &:hover {
        box-shadow: 0px 16px 30px ${props => props.theme && props.theme.hover_kpis};

        div {
            background-color: ${props => props.theme && props.theme.secondary};

            svg {
                fill: ${props => props.theme && props.theme.main};
                stroke: ${props => props.theme && props.theme.main};
            }
        }
    }
`;

const TextStyled = styled.span`
    color: ${props => props.theme && props.theme.text_main_alternative};
    font-family: 'Courier New', Courier, monospace;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0px;
`;

const TextStyledVar = styled(TextStyled)`
    color: ${props => props.theme && props.theme.text_secondary};
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
    background-color: ${props => props.theme && props.theme.secondary_alternative};

    svg {
        width: 28px;
        height: 28px;
        fill: ${props => props.theme && props.theme.secondary};
        stroke: ${props => props.theme && props.theme.secondary};
    }
    

    
`;

interface KPIsProps {
    icon: ReactNode,
    number: number,
    text: string
}

const KPIsComponent = ({ icon, number, text }: KPIsProps) => {
    return (
        <KPIsStyled>
            <IconStyled>
                {icon}
            </IconStyled>
            <p>
                <TextStyled>{number}</TextStyled><br />
                <TextStyledVar>{text}</TextStyledVar>
            </p>
        </KPIsStyled>
    )
}

export default KPIsComponent;

