import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";

const ListItemStyled = styled.li<{$isActive?: boolean}>`
    cursor: pointer;
    width: 40%;
    padding: 0px 0px 10px 0px;
    border-bottom: ${props => props.$isActive ? `2px solid ${props.theme.text_menu_secondary}` : `1px solid ${props.theme.email}`};
    color: ${props => props.$isActive ? `${props.theme.text_menu_secondary}`  : `${props.theme.email}`};
`;

interface ListItemProps {
    index: number,
    str: string,
    setCurrentTab: Dispatch<SetStateAction<string>>,
    currentTab: string,
    children?: ReactNode
}

const ListItemComponent = ({index, str, setCurrentTab, currentTab, children}: ListItemProps) => {

    const handleClickSetCurrentTab = () => {
        setCurrentTab(str);
    };

    return (
        <ListItemStyled key={index} $isActive={currentTab === str ? true : false} onClick={() => handleClickSetCurrentTab()}>
            {children}
        </ListItemStyled>
    );
}

export default ListItemComponent;