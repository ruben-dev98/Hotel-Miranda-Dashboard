import { styled } from "styled-components";

export const InputSearch = styled.input`
    width: 140px;
    height: 10px;
    font-family: "Poppins", sans-serif;
    border-radius: 20px;
    border: 1px solid ${props => props.theme && props.theme.text_menu_secondary};
    padding: 20px;
`;