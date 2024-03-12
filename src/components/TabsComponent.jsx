import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListStyled = styled.ul`
    display: flex;
    justify-content: space-evenly;
    
    li {
        cursor: pointer;
    }
`;

const TabsComponent = ({data, setCurrentTab}) => {

    return (
        <ListStyled>
            {data.map((str, index) => <li key={index} onChange={() => setCurrentTab()}>{str}</li>)}
        </ListStyled>
    )
};

TabsComponent.propTypes = {
    data: PropTypes.array,
    setCurren
}

export default TabsComponent;