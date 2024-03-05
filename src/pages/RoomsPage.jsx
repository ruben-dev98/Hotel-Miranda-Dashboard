import { roomsTabs } from "../assets/data/tabs";
import Tabs from "../components/Tabs";
import Table from './../components/Table';

const RoomsPage = () => {

    const bookings = [];

    const dataTable = [
        {
            'label': 'Image',
            'property': 'foto'
        },
        {
            'label': 'Number',
            'property': 'number'
        },
        {
            'label': 'ID',
            'property': 'id'
        },
        {
            'label': 'Room Type',
            'property': 'type'
        },
        {
            'label': 'Amenities',
            'property': 'amenities'
        },
        {
            'label': 'Price',
            'property': 'price'
        },
        {
            'label': 'Offer Price',
            'display': row => row.price - (row.price * row.discount / 100) 
        },
        {
            'label': 'Status',
            'display': row => bookings.filter((booking) => booking.number === row.number && (booking.check_in >= new Date(Date.now()) && booking.check_out <= new Date(Date.now()))).length === 0 ? 'Available' : 'Booked'
        }
    ];

    return (
        <section className='content'>
            <Tabs data={roomsTabs}></Tabs>
            {/*<Table rows={dataTable} columns={dataTable.length}></Table>*/}
        </section>
    );
}

export default RoomsPage;