import { bookings } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import dataBookings from '../assets/data/bookings.json';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const dataTable = [
    {
        'label': 'Guest',
        display: row => `${row.full_name} ${row.id}`
    },
    {
        'label': 'Order Date',
        display: row => new Date(parseInt(row.order_date, 10)).toLocaleString('es-Es')
    },
    {
        'label': 'Check In',
        display: row => new Date(parseInt(row.check_in, 10)).toLocaleString('es-Es')
    },
    {
        'label': 'Check Out',
        display: row => new Date(parseInt(row.check_out, 10)).toLocaleString('es-Es')
    },
    {
        'label': 'Special Request',
        display: row => row.special_request ? <button onClick={(event) => event.stopPropagation()}>View Notes</button> : <button disabled>View Notes</button>
    },
    {
        'label': 'Room Type',
        display: row => `${row.type} ${row.number}`
    },
    {
        'label': 'Status',
        'property': 'status'
    },
];

const BookingsPage = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    

    return (
            loc.pathname !== "/bookings" ? 
                <Outlet/>
            :
                <section className='content'>
                    <button onClick={() => navigate('booking')}>+ New Booking</button>
                    <TabsComponent data={bookings}></TabsComponent>
                    <TableComponent rows={dataBookings.toSpliced(10, 30)} columns={dataTable} path={'booking'}></TableComponent>
                </section>
        
        
    );
}

export default BookingsPage;