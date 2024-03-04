import { useState } from "react";
import MenuLateral from "../components/Menu/MenuLateral"
import MenuSuperior from "../components/Menu/MenuSuperior"
import { Outlet } from 'react-router-dom';

const MainPage = ({setAuth}) => {
    const [visibleLateral, setVisibleLateral] = useState(false);

    return (
        <>
            <MenuLateral visibleLateral={visibleLateral}/>
            <MenuSuperior setAuth={setAuth} visibleLateral={visibleLateral} setVisibleLateral={setVisibleLateral}/>
            <Outlet/>
        </>
    )
}

export default MainPage;