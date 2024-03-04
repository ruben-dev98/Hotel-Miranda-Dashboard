import { Navigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { BiEnvelope } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { themeLight } from '../../styled/theme';
import styled from 'styled-components';

const MenuSuperiorStyled = styled.ul`
    display: flex;
    justify-content: end;
    gap: 2rem;
    list-style: none;
`;

const FaArrowLeftStyled = styled(FaArrowLeft)`
    fill: #135846;
`;

const FaArrowRightStyled = styled(FaArrowRight)`
    fill: #135846;
`;

const BiEnvelopeStyled = styled(BiEnvelope)`
    fill: #135846;
`;

const CiBellOnStyled = styled(CiBellOn)`
    fill: #135846;
`;

const IoMdLogOutStyled = styled(IoMdLogOut)`
    fill: #135846;
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
        <MenuSuperiorStyled>
            <li onClick={isMenuVisibleHandle}>
                {visibleLateral ? <FaArrowLeftStyled /> : <FaArrowRightStyled />}
            </li>
            <li>
                <BiEnvelopeStyled />
            </li>
            <li>
                <CiBellOnStyled />
            </li>
            <li onClick={logOutHandle}>
                <IoMdLogOutStyled />
            </li>
        </MenuSuperiorStyled>
    )
}

export default MenuSuperior;