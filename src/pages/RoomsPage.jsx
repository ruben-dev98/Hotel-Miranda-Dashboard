import { rooms } from "../assets/data/tabs";
import Tabs from "../components/Tabs";
import Table from '../components/Table';
import dataRooms from '../assets/data/rooms.json'

const RoomsPage = () => {

    const bookings = [];

    const dataTable = [
        {
            'label': 'Image',
            display: row => <img src={row.foto}/>
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
            display: row => row.price - (row.price * row.discount / 100) 
        },
        {
            'label': 'Status',
            'property': 'status'
        }
    ];

    return (
        <section className='content'>
            <Tabs data={rooms}></Tabs>
            <Table rows={dataRooms} columns={dataTable}></Table>
        </section>
    );
}

export default RoomsPage;