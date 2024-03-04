import { Navigate } from 'react-router-dom';

const MenuSuperior = ({setAuth}) => {

    const onClickHandle = () => {
        setAuth(false);
        return <Navigate to="/login" replace/>;
    }

    return (
        <>
            <ul>
                <li>
                    Flecha Lateral Derecha(Si menu lateral recogido)/Flecha Lateral Izquierda(SI menu lateral desplegado)
                </li>
                <li>
                    Sobre
                </li>
                <li>
                    Campana
                </li>
                <li onClick={onClickHandle}>
                    Log Out
                </li>
            </ul>
        </>
    )
}

export default MenuSuperior;