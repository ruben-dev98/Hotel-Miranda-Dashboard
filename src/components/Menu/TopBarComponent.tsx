import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { BiEnvelope } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import styled from 'styled-components';
import { Dispatch, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

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

        path {
            fill: #135846;
        }
    }
`;

interface TopBarComponentProps {
    setVisibleLateral: Dispatch<boolean>,
    visibleLateral: boolean,
    title: string
}

const DivStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopBarComponent = ({ setVisibleLateral, visibleLateral, title}: TopBarComponentProps) => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const logOutHandle = (): void => {
        context.dispatch({type: 'logout', payload: {auth: false, user: '', email: ''}});
        navigate("/login");
    }

    const isMenuVisibleHandle = (): void => {
        //setVisibleLateral((prev: boolean) => !prev);
    }

    return (
        <HeaderStyled>
            <DivStyled>
                <IconStyled onClick={isMenuVisibleHandle}>
                    {visibleLateral ? <AiOutlineMenuFold/> : <FaArrowRight />}
                </IconStyled>
                <h1 id='title'>{title}</h1>
            </DivStyled>
            <IconsListStyled>
                <IconStyled>
                    <BiEnvelope />
                </IconStyled>
                <IconStyled>
                    <CiBellOn />
                </IconStyled>
                <IconStyled id="test__log-out" onClick={logOutHandle}>
                    <IoMdLogOut />
                </IconStyled>
            </IconsListStyled>
        </HeaderStyled>
    )
}

TopBarComponent.propTypes = {
    setVisibleLateral: PropTypes.func,
    visibleLateral: PropTypes.bool,
    title: PropTypes.string
};

export default TopBarComponent;