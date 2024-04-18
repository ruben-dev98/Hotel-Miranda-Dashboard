import { useNavigate } from 'react-router-dom';
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { BiEnvelope } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import styled, { ThemeContext } from 'styled-components';
import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import MySweetAlertApi from '../../app/MySweetAlertApi';
import { accessToLocalStorage } from '../../helpers/accessToLocalStorage';
import { isVisibleMenuKey, localStorageSetAction } from '../../helpers/constants';
import { FaAffiliatetheme } from "react-icons/fa";
import { handleToggleTheme } from '../../helpers/toggleTheme';

const HeaderStyled = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 91px;

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
    gap: 32px;
    list-style: none;
    margin-right: 32px;
`;

const IconStyled = styled.li<{ $visibleLateral?: boolean; }>`
    cursor: pointer;
    transform: ${props => !props.$visibleLateral ? 'scaleX(-1)' : ''};
    svg {
        width: 28px;
        height: 28px;
        fill: ${props => props.theme && props.theme.text_menu_secondary};

        path {
            fill: ${props => props.theme && props.theme.text_menu_secondary};
        }
    }
`;

const TitleStyled = styled.h1`
    color: ${props => props.theme && props.theme.text_main_alternative};
`;

interface TopBarComponentProps {
    setVisibleLateral: Dispatch<SetStateAction<boolean>>,
    visibleLateral: boolean,
    title: string
}

const DivStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopBarComponent = ({ setVisibleLateral, visibleLateral, title}: TopBarComponentProps) => {
    const themeContext = useContext(ThemeContext)!;
    const setToggleThemeState: Dispatch<SetStateAction<string>> = themeContext.setThemeState;
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const logOutHandle = (): void => {
        context.dispatch({type: 'logout', payload: {auth: false, user: '', email: '', token: ''}});
        navigate("/login");
        MySweetAlertApi({title: 'Logout Successfully', icon: 'success'});
    }

    const isMenuVisibleHandle = (): void => {
        setVisibleLateral((prev) => {
            accessToLocalStorage({key: isVisibleMenuKey, item: !prev === true ? '1' : '0', action: localStorageSetAction});
            return !prev;
        });
        
    }

    return (
        <HeaderStyled>
            <DivStyled>
                <IconStyled $visibleLateral = {visibleLateral} onClick={isMenuVisibleHandle}>
                    <AiOutlineMenuFold/>
                </IconStyled>
                <TitleStyled id='title'>{title}</TitleStyled>
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
                <IconStyled onClick={() => handleToggleTheme(setToggleThemeState)}>
                    <FaAffiliatetheme />
                </IconStyled>
            </IconsListStyled>
        </HeaderStyled>
    )
}

export default TopBarComponent;