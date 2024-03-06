import { rooms } from "../assets/data/tabs";
import TabsComponent from "../components/TabsComponent";
import TableComponent from '../components/TableComponent';
import dataRooms from '../assets/data/rooms.json'

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

const RoomsPage = () => {

    return (
        <section className='content'>
            <TabsComponent data={rooms}></TabsComponent>
            <TableComponent  rows={dataRooms} columns={dataTable}></TableComponent>
        </section>
    );
}

export default RoomsPage;