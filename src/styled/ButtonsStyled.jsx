import styled from "styled-components";

export const ButtonStyled = styled.button`
    font-family: "Poppins", sans-serif;
    color: #FFF;
    background-color: #135846;
    border-radius: 20px;
    width: 100px;
    height: 50px;
    border: 0rem;
`;

export const ButtonStyledPublish = styled(ButtonStyled)`
    background-color: #5AD07A;
`;

export const ButtonStyledArchived = styled(ButtonStyled)`
    background-color: #E23428;
`;

export const ButtonStyledViewNotes = styled(ButtonStyled)`
    background-color: #EEF9F2;
    color: #393939;
`;