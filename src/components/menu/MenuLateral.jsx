import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { PiKey } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import styled from 'styled-components';

const MenuLateralStyled = styled.menu`
    background-color: #FFF;

    
`;

const NavLinkStyled = styled(NavLink)`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;

    &.active {
        border-left: 2px #E23428 solid;
    }

    svg {
        width: 40px;
        height: 40px;
        fill: #E23428;
    }
`;

const MenuLateral = ({ visibleLateral }) => {

    return (
        visibleLateral &&
        <menu className='menu_lateral'>
            <nav>
                <NavLinkStyled to="/">
                    <MdOutlineDashboard />
                    Dashboard
                </NavLinkStyled>
                <NavLinkStyled to="/bookings">
                    <FaCalendarAlt />
                    Bookings
                </NavLinkStyled>
                <NavLinkStyled to="/rooms">
                    <PiKey />
                    Rooms
                </NavLinkStyled>
                <NavLinkStyled to="/users">
                    <FaUser />
                    Users
                </NavLinkStyled>
                <NavLinkStyled to="/contact">
                    <MdOutlineContactMail />
                    Contact
                </NavLinkStyled>
            </nav>
            <div>
                <img src='' alt='' />
                <h2>Rubén Dopico Novo</h2>
                <p>ruben.dopico.dev@gmail.com</p>
                <button>Editar</button>
            </div>
        </menu>
    );
}


export default MenuLateral;