import { Navigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { BiEnvelope } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { themeLight } from '../../styled/theme';
import styled from 'styled-components';

const HeaderStyled = styled.header`
    width: 75%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
`;

const IconsListStyled = styled.ul`
    display: flex;
    justify-content: end;
    gap: 2rem;
    list-style: none;
`;

const IconStyled = styled.li`

    svg {
        width: 28px;
        height: 28px;
        fill: #135846;
    }
`;

const MenuSuperior = ({ setAuth, setVisibleLateral, visibleLateral }) => {

    const logOutHandle = () => {
        setAuth(false);
        return <Navigate to="/login" replace />;
    }

    const isMenuVisibleHandle = () => {
        setVisibleLateral(prev => !prev);
    }

    return (
        <HeaderStyled>
            <IconStyled onClick={isMenuVisibleHandle}>
                {visibleLateral ? <FaArrowLeft /> : <FaArrowRight />}
            </IconStyled>
            <IconsListStyled>
                <IconStyled>
                    <BiEnvelope />
                </IconStyled>
                <IconStyled>
                    <CiBellOn />
                </IconStyled>
                <IconStyled onClick={logOutHandle}>
                    <IoMdLogOut />
                </IconStyled>
            </IconsListStyled>
        </HeaderStyled>
    )
}

export default MenuSuperior;