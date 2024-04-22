import { styled } from "styled-components";

export const AmenitiesStyled = styled.ul`
    display: flex;
    padding: 0px;
    gap: 25px;
    flex-wrap: wrap;
    align-items: center;

    li {
        font-size: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 50px;
        border-radius: 10px;
        background-color: ${props => props.theme && props.theme.amenities};
        color: ${props => props.theme && props.theme.text_menu_secondary};
    }
`;