import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/travl.png';
import me from '../../assets/img/CV.png';
import { links } from '../../assets/data/navLink';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import MySweetAlert from '../../app/MySweetAlert';
import Swal from 'sweetalert2';
import { ButtonStyled, ButtonStyledViewNotes } from '../../styled/ButtonStyled';
import { StyledP } from '../../styled/SpanStyled';

const SideBarStyled = styled.menu`
    grid-area: sidebar;
    width: 100%;
    padding: 0rem;
    margin: 0rem;

    & > img {
        width: 220px;
        height: 57px;
        margin: 32px 0px 32px 32px;
    }
    
    div {
        margin: 30px 20px 0px 20px;
        padding: 32px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    
        img {
            display: block;
            margin: 0 auto;
            width: 120px;
            height: 120px;
        }
    }

    button {
        display: block;
        margin: 0 auto;
    }
`;

const NavLinkStyled = styled(NavLink)`
    height: 67px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    padding: 0rem 32px;
    gap: 32px;
    color: ${props => props.theme.separator};

    

    &:not(:last-child) {
        margin-bottom: 15px;
    }

    &.active {
        border-left: 2px ${props => props.theme.secondary} solid;
        color: ${props => props.theme.secondary};

        svg {
            fill: ${props => props.theme.secondary};
        }
    }

    svg {
        width: 28px;
        height: 28px;
        fill: ${props => props.theme.separator};
    }

    
`;

const TitleStyled = styled.h2`
    color: ${props => props.theme && props.theme.text_main_alternative};
`;

interface SideBarComponentProps {
    visibleLateral: boolean
}

interface FormData extends EventTarget {
    user: HTMLFormElement,
    email: HTMLFormElement
}

const SideBarComponent = ({ visibleLateral }: SideBarComponentProps) => {
    const context = useContext(UserContext);
    const lengthEmail = context.state.email.length;
    const halfLengthEmail = lengthEmail/2;

    return (
        visibleLateral &&
        <SideBarStyled>
            <img src={logo} />
            <nav>
                {links.map(({ icon, text, path }, index) =>
                    <NavLinkStyled to={path} key={index}>
                        {React.createElement(icon)}
                        {text}
                    </NavLinkStyled>)
                }
            </nav>
            <div>
                <img src={me} alt='' />
                <TitleStyled >{context.state.user}</TitleStyled>
                <StyledP>
                    {context.state.email.substring(0, halfLengthEmail)}
                    <br/>
                    {context.state.email.substring(halfLengthEmail)}
                </StyledP>
                <ButtonStyledViewNotes onClick={() => {
                    const html =
                        (<form className='edit__user-pop-up' onSubmit={(event) => {
                            event.preventDefault();
                            const element = event.target as FormData;
                            context.dispatch({ type: 'edit', payload: { auth: true, user: element.user.value, email: element.email.value, token: '' } });
                            Swal.close();
                        }}>

                            <div>
                                <label>Full Name</label>
                                <input type="text" defaultValue={context.state.user} name="user" placeholder="Full Name" />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" defaultValue={context.state.email} name="email" placeholder="Email" />
                            </div>
                            <div>
                                <ButtonStyled type="submit">Edit User</ButtonStyled>
                            </div>
                        </form>);
                    return MySweetAlert({ title: 'Update User', html: html, showConfirmButton: false });
                }}>Editar</ButtonStyledViewNotes>
            </div>
        </SideBarStyled>
    );
}

export default SideBarComponent;