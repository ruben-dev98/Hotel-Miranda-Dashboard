import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const ListStyled = styled.ul`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 2px;
`;

const ListItemStyled = styled.li`
    cursor: pointer;
    width: 10%;
    padding: 10px;
    border-bottom: ${props => props.$isActive ? '2px solid #135846' : '1px solid #B2B2B2'};
    color: ${props => props.$isActive ? '#135846' : '#B2B2B2'};
`;

const TabsComponent = ({data, setCurrentTab, currentTab}) => {
    return (
        <ListStyled>
            {data.map((str, index) => <ListItemStyled key={index} $isActive={currentTab === str.value ? true : false} onClick={() => {
                setCurrentTab(str.value)
            }}>{str.label}</ListItemStyled>)}
        </ListStyled>
    )
};

TabsComponent.propTypes = {
    data: PropTypes.array,
    setCurrentTab: PropTypes.func,
    currentTab: PropTypes.string
}

export default TabsComponent;