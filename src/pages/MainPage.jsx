import { useState } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from 'prop-types';
import SideBarComponent from "../components/Menu/SideBarComponent";
import TopBarComponent from "../components/Menu/TopBarComponent";

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

const content = (setAuth, visibleLateral, setVisibleLateral, title) => {
    return (
    <>
        <SideBarComponent visibleLateral={visibleLateral} />
        <TopBarComponent setAuth={setAuth} visibleLateral={visibleLateral} setVisibleLateral={setVisibleLateral} title={title}/>
        <Outlet />
    </>
    );
};
    


const MainPage = ({ setAuth }) => {
    const [visibleLateral, setVisibleLateral] = useState(true);
    const title = useLocation().key;

    const initLabel = visibleLateral ? 
    <WindowStyled>
        {content(setAuth, visibleLateral, setVisibleLateral, title)}
    </WindowStyled> 
    : 
    <WindowStyledCollapse>
        {content(setAuth, visibleLateral, setVisibleLateral, title)}
    </WindowStyledCollapse>;


    return (
        <>
            {initLabel}
        </>
    )
}

MainPage.propTypes = {
    setAuth: PropTypes.bool
}

export default MainPage;