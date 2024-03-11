import { rooms } from "../assets/data/tabs";
import TabsComponent from "../components/TabsComponent";
import TableComponent from '../components/TableComponent';
import { SpanStyled, SpanStyledCheckOut } from "../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import OrderComponent from "../components/OrderComponent";
import { roomsOrder } from "../assets/data/order";
import { LinkStyled } from "../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRooms, roomsStatus } from "../features/rooms/roomsSlice";
import { getRooms } from "../features/rooms/roomsAsyncThunk";

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
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const data = useSelector(getAllRooms);
    const status = useSelector(roomsStatus);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getRooms());
        } else if (status === 'pending') {
            setShowSpinner(true);
        } else if (status === 'fulfilled') {
            setShowSpinner(false);
        }
    }, [status, dispatch])


    return (
        showSpinner ? <span>Loading</span> :
            <section className='content'>
            <div className="top__menu-table">
                <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                <OrderComponent data={roomsOrder}/>
            </div>
                <TabsComponent data={rooms}></TabsComponent>
                <TableComponent rows={data} columns={dataTable} path={'rooms'}></TableComponent>
            </section>
    );
}

export default RoomsPage;