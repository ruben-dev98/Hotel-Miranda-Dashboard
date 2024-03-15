import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo_claro from '../../assets/img/travl_claro.png';
import me from '../../assets/img/CV.png';
import { links } from '../../assets/data/navlink';
import React from 'react';
import { ButtonStyled, ButtonStyledViewNotes } from '../../styled/ButtonsStyled';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import MySwal from '../../app/MySwal';
import Swal from 'sweetalert2';

const SideBarStyled = styled.menu`
    grid-area: sidebar;
    width: 100%;
    background-color: #FFF;
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
    color: #799283;

    

    &:not(:last-child) {
        margin-bottom: 15px;
    }

    &.active {
        border-left: 2px #E23428 solid;
        color: #E23428;

        svg {
            fill: #E23428;
        }
    }

    svg {
        width: 28px;
        height: 28px;
        fill: #799283;
    }

    
`;

const SideBarComponent = ({ visibleLateral }) => {
    const loc = useLocation().pathname;
    const context = useContext(UserContext);

    return (
        visibleLateral &&
        <SideBarStyled>
            <img src={logo_claro}/>
            <nav>
                {links.map(({icon, text, path}, index) => 
                    <NavLinkStyled to={path} key={index} className={loc.includes(path.split('/')) ? 'active' : ''}>
                        {React.createElement(icon)}
                        {text}
                    </NavLinkStyled>)
                }
            </nav>
            <div>
                <img src={me} alt='' />
                <h2>{context.state.user}</h2>
                <p>{context.state.email}</p>
                <ButtonStyledViewNotes onClick={() => {
                    const html = 
                    (<form className='edit__user-pop-up' onSubmit={(event) => 
                    {
                        event.preventDefault();
                        context.dispatch({type: 'edit', payload: {user: event.target.user.value, email: event.target.email.value}});
                        Swal.close();
                    }}>
                        
                        <div>
                            <label>Full Name</label>
                            <input type="text" defaultValue={context.state.user} name="user" placeholder="Full Name"/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" defaultValue={context.state.email} name="email" placeholder="Email"/>
                        </div>
                        <div>
                            <ButtonStyled type="submit">Edit User</ButtonStyled>
                        </div>
                    </form>);
                    return MySwal('Update User', html, false);
                }}>Editar</ButtonStyledViewNotes>
            </div>
        </SideBarStyled>
    );
}

SideBarComponent.propTypes = {
    visibleLateral: PropTypes.bool
};

export default SideBarComponent;