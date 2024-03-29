import { useState } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import SideBarComponent from "../components/Menu/SideBarComponent";
import TopBarComponent from "../components/Menu/TopBarComponent";
import WindowStyledComponent from "../components/WindowComponent/WindowComponent";

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
            <WindowStyledComponent visibleLateral={visibleLateral}>
                {content(visibleLateral, setVisibleLateral, title(path))}
            </WindowStyledComponent>
        </>
    )
}

export default MainPage;