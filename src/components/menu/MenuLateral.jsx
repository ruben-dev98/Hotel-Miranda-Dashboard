import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { PiKey } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";

const MenuLateral = () => {

return (
    <>
        <ul>
            <li>
                <MdOutlineDashboard/>
                <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
                <FaCalendarAlt/>
                <NavLink to="/bookings">Bookings</NavLink>
            </li>
            <li>
                <PiKey/>
                <NavLink to="/rooms">Rooms</NavLink>
            </li>
            <li>
                <FaUser />
                <NavLink to="/users">Users</NavLink>
            </li>
            <li> 
                <MdOutlineContactMail />
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </ul>
        <div>
            <img src='' alt='' />
            <h2>Rubén Dopico Novo</h2>
            <p>ruben.dopico.dev@gmail.com</p>
            <button>Editar</button>
        </div> 
    </> 
    );
}


export default MenuLateral;