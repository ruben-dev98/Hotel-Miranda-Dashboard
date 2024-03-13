import { useState } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import styled from "styled-components";
import SideBarComponent from "../components/Menu/SideBarComponent";
import TopBarComponent from "../components/Menu/TopBarComponent";

const WindowStyled = styled.div`
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 10% 90%;
    grid-template-areas: ${props => props.$visibleLateral ? 
    `'sidebar header'
    'sidebar content'`
    :
    `'header header'
    'content content'`};
`;

const content = (visibleLateral, setVisibleLateral, title) => {
    return (
    <>
        <SideBarComponent visibleLateral={visibleLateral} />
        <TopBarComponent visibleLateral={visibleLateral} setVisibleLateral={setVisibleLateral} title={title}/>
        <Outlet />
    </>
    );
};

const title = (path) => {
    switch(true) {
        case path.startsWith('/rooms/room'):
            return 'New Room';
        case path.startsWith('/rooms/'):
            return 'Rooms > Room';
        case path.startsWith('/rooms'):
            return 'Rooms';
        case path.startsWith('/bookings/booking'):
            return 'New Booking';
        case path.startsWith('/bookings/'):
            return 'Bookings > Booking';
        case path.startsWith('/bookings'):
            return 'Bookings';
        case path.startsWith('/users/user'):
            return 'New Employees';
        case path.startsWith('/users/'):
            return 'Users > User';
        case path.startsWith('/users'):
            return 'Employees';
        case path.startsWith('/contact'):
            return 'Messages';
        default:
            return 'Dashboard';
    }

    
};


const MainPage = () => {
    const [visibleLateral, setVisibleLateral] = useState(true);
    const path = useLocation().pathname;
    
    return (
        <>
            <WindowStyled $visibleLateral={visibleLateral}>
                {content(visibleLateral, setVisibleLateral, title(path))}
            </WindowStyled>
        </>
    )
}

export default MainPage;