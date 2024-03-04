import { useState } from "react";
import MenuLateral from "../components/Menu/MenuLateral"
import { Outlet } from 'react-router-dom';
import MenuSuperior from '../components/Menu/MenuSuperior';

const MainPage = ({setAuth}) => {
    const [visibleLateral, setVisibleLateral] = useState(false);

    return (
        <>
            <MenuSuperior setAuth={setAuth} visibleLateral={visibleLateral} setVisibleLateral={setVisibleLateral}/>
            <MenuLateral visibleLateral={visibleLateral}/>
            <Outlet />
        </>
    )
}

export default MainPage;