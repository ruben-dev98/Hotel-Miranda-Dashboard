import { Navigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const MenuSuperior = ({setAuth, setVisibleLateral, visibleLateral}) => {

    const logOutHandle = () => {
        setAuth(false);
        return <Navigate to="/login" replace/>;
    }

    const isMenuVisibleHandle = () => {
        setVisibleLateral(prev => !prev);
    }

    return (
        <>
            <ul>
                <li onClick={isMenuVisibleHandle}>
                    {visibleLateral ? <FaArrowLeft/> : <FaArrowRight />}
                </li>
                <li>
                    Sobre
                </li>
                <li>
                    Campana
                </li>
                <li onClick={logOutHandle}>
                    Log Out
                </li>
            </ul>
        </>
    )
}

export default MenuSuperior;