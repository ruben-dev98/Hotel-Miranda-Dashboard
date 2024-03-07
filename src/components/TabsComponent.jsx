import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListStyled = styled.ul`
    display: flex;
    justify-content: space-evenly;
    
    li {
        cursor: pointer;
    }
`;

const TabsComponent = ({data}) => {

    return (
        <ListStyled>
            {data.map((str, index) => <li key={index}>{str}</li>)}
        </ListStyled>
    )
};

TabsComponent.propTypes = {
    data: PropTypes.array
}

export default TabsComponent;