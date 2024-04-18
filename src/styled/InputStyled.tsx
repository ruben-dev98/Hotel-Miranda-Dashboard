import { styled } from "styled-components";

export const InputSearch = styled.input`
    width: 140px;
    height: 10px;
    font-family: "Poppins", sans-serif;
    border-radius: 20px;
    border: 1px solid ${props => props.theme && props.theme.text_menu_secondary};
    background-color: ${props => props.theme && props.theme.main};
    color: ${props => props.theme && props.theme.text_main_alternative};
    padding: 20px;
    &::placeholder {
        color: ${props => props.theme && props.theme.text_main_alternative};
    }
`;