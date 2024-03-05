import { useState } from "react";
import MenuLateral from "../components/Menu/MenuLateral"
import { Outlet } from 'react-router-dom';
import MenuSuperior from '../components/Menu/MenuSuperior';
import styled from "styled-components";

const WindowStyled = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 10% 90%;
    grid-template-areas: 
    'sidebar header'
    'sidebar content';
`;

const WindowStyledCollapse = styled(WindowStyled)`
    grid-template-areas: 
    'header header'
    'content content';
`;

const content = (setAuth, visibleLateral, setVisibleLateral) => {
    return (
    <>
        <MenuLateral visibleLateral={visibleLateral} />
        <MenuSuperior setAuth={setAuth} visibleLateral={visibleLateral} setVisibleLateral={setVisibleLateral} />
        <Outlet />
    </>
    );
};
    


const MainPage = ({ setAuth }) => {
    const [visibleLateral, setVisibleLateral] = useState(true);

    const initLabel = visibleLateral ? 
    <WindowStyled>
        {content(setAuth, visibleLateral, setVisibleLateral)}
    </WindowStyled> 
    : 
    <WindowStyledCollapse>
        {content(setAuth, visibleLateral, setVisibleLateral)}
    </WindowStyledCollapse>;


    return (
        <>
            {initLabel}
        </>
    )
}

export default MainPage;