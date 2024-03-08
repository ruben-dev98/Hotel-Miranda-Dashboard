import { rooms } from "../assets/data/tabs";
import TabsComponent from "../components/TabsComponent";
import TableComponent from '../components/TableComponent';
import dataRooms from '../assets/data/rooms.json'
import { Outlet, useLocation } from "react-router-dom";
import { SpanStyled, SpanStyledCheckOut } from "../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import OrderComponent from "../components/OrderComponent";
import { roomsOrder } from "../assets/data/order";
import { LinkStyled } from "../styled/LinkStyled";

const action = (id) => {
    return <ButtonStyledViewNotes as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}>Edit</ButtonStyledViewNotes>
}

const dataTable = [
    {
        'label': 'Image',
        display: row => <img src={row.foto} style={{ width: 200, height: 100 }} />
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
        display: row => row.status === 'Available' ?
            <SpanStyled>Available</SpanStyled>
            :
            <SpanStyledCheckOut>Booked</SpanStyledCheckOut>
    },
    {
        'label' : 'Actions',
        display: row => action(row.id)
    }
];

const RoomsPage = () => {
    const loc = useLocation();

    return (
        loc.pathname !== '/rooms' ?
            <Outlet></Outlet>
            :
            <section className='content'>
            <div className="top__menu-table">
                <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                <OrderComponent data={roomsOrder}/>
            </div>
                <TabsComponent data={rooms}></TabsComponent>
                <TableComponent rows={dataRooms.toSpliced(10, 30)} columns={dataTable} path={'room'}></TableComponent>
            </section>
    );
}

export default RoomsPage;