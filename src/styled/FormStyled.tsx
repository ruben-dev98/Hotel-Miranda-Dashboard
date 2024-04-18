import { styled } from "styled-components";

export const FormStyledComponent = styled.form`
    
    div {
        margin: 0 auto;
        width: 60%;

        div {
            margin-bottom: 20px;
            
            .rooms{
                width: 200px;
                height: 100px;
            }

            .users {
                width: 80px;
                height: 80px;
            }
        }
    }
    
    label {
        color: ${props => props.theme && props.theme.text_main_alternative};
        display: block;
        margin-bottom: 0.75rem;
    }
    
    input {
        font-family: "Poppins", sans-serif;
        padding: 0rem 1.75rem;
        border: 0em;
        display: block;
        width: 90%;
        background-color: ${props => props.theme && props.theme.main};
        height: 3.75rem;
        margin-bottom: 0.75rem;
    }

    textarea {
        font-family: "Poppins", sans-serif;
        border: 0rem;
        padding: 1.75rem 1.75rem;
        width: 90%;
        display: block;
        margin-bottom: 0.75rem;
    }

    select {
        font-family: "Poppins", sans-serif;
        border: 0rem;
        padding: 1rem 1.75rem;
        width: 96.3%;
        display: block;
        margin-bottom: 0.75rem;
        background-color: ${props => props.theme && props.theme.main};
    }

    button {
        display: block;
        width: 200px;
        height: 100px;
        margin: 40px 35px 0 auto;
    }
`;

export const FormStyledLogin = styled.form`
    padding: 4rem;
    width: 50%;
    margin: 200px auto 0 auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    div {
        width: 60%;
        margin: 0 auto 2rem auto;
    }

    label {
        display: block;
        font-size: 1.5rem;
        margin-bottom: 1.25rem;
    }

    input {
        font-family: "Poppins", sans-serif;
        width: 100%;
        height: 1rem;
        padding: 2rem;
        display: block;
        font-size: 1.5rem;
    }

    button {
        display: block;
        margin: 0 0 0 auto;
    }
`;