import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { BiEnvelope } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import styled from 'styled-components';

const HeaderStyled = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        gap: 32px;

        span {
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: 0rem;
        }
    }
`;

const IconsListStyled = styled.ul`
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    list-style: none;
`;

const IconStyled = styled.li`
    cursor: pointer;
    svg {
        width: 28px;
        height: 28px;
        fill: #135846;
    }
`;

const TopBarComponent = ({ setAuth, setVisibleLateral, visibleLateral, title}) => {
    const navigate = useNavigate();
    const logOutHandle = () => {
        setAuth(false);
        navigate("/login");
    }

    const isMenuVisibleHandle = () => {
        setVisibleLateral(prev => !prev);
    }

    return (
        <HeaderStyled>
            <div>
                <IconStyled onClick={isMenuVisibleHandle}>
                    {visibleLateral ? <FaArrowLeft /> : <FaArrowRight />}
                    <span>{title}</span>
                </IconStyled>
            </div>
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

TopBarComponent.propTypes = {
    setAuth: PropTypes.func,
    setVisibleLateral: PropTypes.func,
    visibleLateral: PropTypes.bool,
    title: PropTypes.string
};

export default TopBarComponent;