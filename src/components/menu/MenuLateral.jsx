import { NavLink } from 'react-router-dom';

const MenuLateral = () => {

return (
        <>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <div>
            <img />
            <h2>NAME</h2>
            <p>EMAIL</p>
            <button>Editar</button>
        </div>
        </>
    );
}


export default MenuLateral;