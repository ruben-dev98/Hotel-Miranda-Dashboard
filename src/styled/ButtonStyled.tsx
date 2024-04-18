import { styled } from "styled-components";

export const ButtonStyled = styled.button`
    font-family: "Poppins", sans-serif;
    color: ${props => props.theme && props.theme.main};
    background-color: ${props => props.theme && props.theme.text_menu_secondary};
    border-radius: 20px;
    width: 100px;
    height: 50px;
    border: 0rem;

    &:disabled {
        background-color: ${props => props.theme && props.theme.main};
        color: ${props => props.theme && props.theme.text_main_alternative};
        outline: 1px solid ${props => props.theme && props.theme.text_menu_secondary};
    }
`;

export const ButtonStyledPublish = styled(ButtonStyled)`
    background-color: ${props => props.theme && props.theme.check};
`;

export const ButtonStyledArchived = styled(ButtonStyled)`
    background-color: ${props => props.theme && props.theme.secondary};
`;

export const ButtonStyledViewNotes = styled(ButtonStyled)`
    background-color: ${props => props.theme && props.theme.view_notes};
    color: ${props => props.theme && props.theme.text_main_alternative};
`;

export const ButtonStyledNew = styled(ButtonStyled)`
    width: 200px;
`;

export const ButtonStyledIcon = styled(ButtonStyled)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: ${props => props.theme && props.theme.view_notes};
    color: ${props => props.theme && props.theme.text_main_alternative};
    border-radius: 10px;
`;