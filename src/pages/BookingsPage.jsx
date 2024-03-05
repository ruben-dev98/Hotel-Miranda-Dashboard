import {bookings} from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";

const BookingsPage = () => {
    
    const dataTable = [
        {
            'label': 'Guest',
            display: row => `${row.full_name} ${row.id}`
        },
        {
            'label': 'Order Date',
            display: row => new Date(row.order_date).toLocaleString('es-Es')
        },
        {
            'label': 'Check In',
            display: row => new Date(row.check_in).toLocaleString('es-Es')
        },
        {
            'label': 'Check Out',
            display: row => new Date(row.check_out).toLocaleString('es-Es')
        },
        {
            'label': 'Special Request',
            display: row => <button>View Notes</button>
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

    return (
        <section className='content'>
            <Tabs data={bookings}></Tabs>
            {/*<Table rows={dataTable} columns={dataTable.length}></Table>*/}
        </section>
        
    );
}

export default BookingsPage;