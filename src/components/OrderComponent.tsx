
import styled from 'styled-components';
import { IOrder } from '../assets/data/order';
import { Dispatch, SetStateAction, useContext } from 'react';

const SelectStyled = styled.select`
    border: 1px solid ${props => props.theme && props.theme.text_menu_secondary};
    background-color: ${props => props.theme && props.theme.main};
    color: ${props => props.theme && props.theme.text_main_alternative};
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    width: 200px;
    height: 50px;
`;

interface OrderProps {
    data: IOrder[],
    setCurrentOrder: Dispatch<SetStateAction<string>>
}

const OrderComponent = ({data, setCurrentOrder}: OrderProps) => {
    return (
        <SelectStyled onChange={(event) => setCurrentOrder(event.target.value)}>
            {data.map((str, index) => <option key={index} value={str.value}>{str.label}</option>)}
        </SelectStyled>
    )
};

export default OrderComponent;