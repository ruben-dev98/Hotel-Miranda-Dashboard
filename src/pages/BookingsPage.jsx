import { bookingsTabs } from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";

const BookingPage = () => {
    
    const dataTable = [
        {
            'label': 'Guest',
            'display': row => `${row.full_name} ${row.id}`
        },
        {
            'label': 'Order Date',
            'display': row => new Date(row.order_date)
        },
        {
            'label': 'Check In',
            'display': row => new Date(row.check_in)
        },
        {
            'label': 'Check Out',
            'display': row => new Date(row.check_out)
        },
        {
            'label': 'Special Request',
            'display': row => <button onClick={showModal}>View Notes</button>
        },
        {
            'label': 'Room Type',
            'display': row => `${row.type} ${row.number}`
        },
        {
            'label': 'Status',
            'property': 'status'
        },
    ];

    return (
        <>
            <Tabs data={bookingsTabs}></Tabs>
            <Table rows={dataTable} columns={dataTable.length}></Table>
        </>
        
    );
}

export default BookingPage;