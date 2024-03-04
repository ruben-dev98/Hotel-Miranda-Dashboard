import MenuLateral from "../components/Menu/MenuLateral"
import MenuSuperior from "../components/Menu/MenuSuperior"
import { Outlet } from 'react-router-dom';

const MainPage = ({setAuth}) => {

    return (
        <>
            <MenuLateral/>
            <MenuSuperior setAuth={setAuth}/>
            <Outlet/>
        </>
    )
}

export default MainPage;