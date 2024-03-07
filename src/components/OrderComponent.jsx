
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectStyled = styled.select`
    border: 1px solid #135846;
    background-color: #FFF;
    color: #393939;
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    width: 200px;
    height: 50px;
`;

const OrderComponent = ({data}) => {

    return (
        <SelectStyled>
            {data.map((str, index) => <option key={index}>{str}</option>)}
        </SelectStyled>
    )
};

OrderComponent.propTypes = {
    data: PropTypes.array
}

export default OrderComponent;