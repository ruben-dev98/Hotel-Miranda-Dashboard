import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { PiKey } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import styled from 'styled-components';

const MenuLateralStyled = styled.menu`
    width: 345px;
    background-color: #FFF;
    padding: 0rem;
    margin: 0rem;
    
`;

const NavLinkStyled = styled(NavLink)`
    width: 100%;
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

const MenuLateral = ({ visibleLateral }) => {

    return (
        visibleLateral &&
        <MenuLateralStyled className='menu_lateral'>
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
        </MenuLateralStyled>
    );
}


export default MenuLateral;