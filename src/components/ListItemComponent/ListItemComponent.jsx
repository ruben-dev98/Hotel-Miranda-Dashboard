import styled from "styled-components";

const ListItemStyled = styled.li`
    cursor: pointer;
    width: 10%;
    padding: 10px;
    border-bottom: ${props => props.$isActive ? '2px solid #135846' : '1px solid #B2B2B2'};
    color: ${props => props.$isActive ? '#135846' : '#B2B2B2'};
`;

const ListItemComponent = ({index, str, setCurrentTab, currentTab, children}) => {

    return (
        <ListItemStyled key={index} $isActive={currentTab === str ? true : false} onClick={() => {
            setCurrentTab(str)}}>
            {children}
        </ListItemStyled>
    );
}

export default ListItemComponent;