import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListStyled = styled.ul`
    display: flex;
    justify-content: space-evenly;
`;

const Tabs = ({data}) => {

    return (
        <ListStyled>
            {data.map((str, index) => <li key={index}>{str}</li>)}
        </ListStyled>
    )
};

Tabs.propTypes = {
    data: PropTypes.array
}

export default Tabs;