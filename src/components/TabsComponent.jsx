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
            {data.map((str, index) => <li key={index} onClick={(event) => {
                //event.target.classList.toggle('active_tab');
                setCurrentTab(str.value)
            }}>{str.label}</li>)}
        </ListStyled>
    )
};

TabsComponent.propTypes = {
    data: PropTypes.array,
    setCurrentTab: PropTypes.func
}

export default TabsComponent;