import styled from 'styled-components';
import ListItemComponent from './ListItemComponent/LisItemComponent';
import { ITabsObject } from '../assets/data/tabs';
import { Dispatch, SetStateAction } from 'react';

const ListStyled = styled.ul`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 2px;
`;

interface TabsProps {
    data: ITabsObject[],
    setCurrentTab: Dispatch<SetStateAction<string | boolean>>,
    currentTab: string | boolean
}

const TabsComponent = ({data, setCurrentTab, currentTab}: TabsProps) => {
    return (
        <ListStyled>
            {data.map((str, index) => 
            <ListItemComponent key={index} index={index} setCurrentTab={setCurrentTab} currentTab={currentTab} str={str.value}>
                {str.label}
            </ListItemComponent>)}
        </ListStyled>
    )
};

export default TabsComponent;