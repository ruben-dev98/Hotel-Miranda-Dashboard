import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ListItemComponent from './ListItemComponent/ListItemComponent';

const ListStyled = styled.ul`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 2px;
`;

const TabsComponent = ({data, setCurrentTab, currentTab}) => {
    return (
        <ListStyled>
            {data.map((str, index) => 
            <ListItemComponent index={index} setCurrentTab={setCurrentTab} currentTab={currentTab} str={str.value}>
                {str.label}
            </ListItemComponent>)}
        </ListStyled>
    )
};

TabsComponent.propTypes = {
    data: PropTypes.array,
    setCurrentTab: PropTypes.func,
    currentTab: PropTypes.string
}

export default TabsComponent;