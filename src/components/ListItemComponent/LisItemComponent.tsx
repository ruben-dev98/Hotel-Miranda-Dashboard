import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";

const ListItemStyled = styled.li<{$isActive?: boolean}>`
    cursor: pointer;
    width: 10%;
    padding: 10px;
    border-bottom: ${props => props.$isActive ? '2px solid #135846' : '1px solid #B2B2B2'};
    color: ${props => props.$isActive ? '#135846' : '#B2B2B2'};
`;

interface ListItemProps {
    index: number,
    str: string,
    setCurrentTab: Dispatch<SetStateAction<string>>,
    currentTab: string | boolean,
    children?: ReactNode
}

const ListItemComponent = ({index, str, setCurrentTab, currentTab, children}: ListItemProps) => {

    return (
        <ListItemStyled key={index} $isActive={currentTab === str ? true : false} onClick={() => {
            setCurrentTab(str)}}>
            {children}
        </ListItemStyled>
    );
}

export default ListItemComponent;