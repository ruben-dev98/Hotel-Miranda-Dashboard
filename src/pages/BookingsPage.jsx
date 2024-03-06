import { bookings } from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";
import dataBookings from '../assets/data/bookings.json';

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
        display: row => row.special_request ? <button>View Notes</button> : <button disabled>View Notes</button>
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

    return (
        <section className='content'>
            <Tabs data={bookings}></Tabs>
            <Table rows={dataBookings} columns={dataTable}></Table>
        </section>
        
    );
}

export default BookingsPage;