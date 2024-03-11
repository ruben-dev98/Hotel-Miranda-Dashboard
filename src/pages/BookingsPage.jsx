import { bookings } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/SpanStyled";
import OrderComponent from "../components/OrderComponent";
import { bookingsOrder } from "../assets/data/order";
import Swal from 'sweetalert2'
import { LinkStyled } from "../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { bookingsStatus, getAllBookings } from "../features/bookings/bookingsSlice";
import { useEffect, useState } from "react";
import { getBookings } from "../features/bookings/bookingsAsyncThunk";

const handleClickEdit = (event) => {
    event.stopPropagation();
    Swal.fire('Cancelada');
}

const action = () => {
    return <ButtonStyledViewNotes onClick={(event) => handleClickEdit(event)}>Cancelada</ButtonStyledViewNotes>
}

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
        display: row => row.special_request ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                return Swal.fire(row.special_request)
            }}>View Notes</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotes disabled>View Notes</ButtonStyledViewNotes>
    },
    {
        'label': 'Room Type',
        display: row => `${row.type} ${row.number}`
    },
    {
        'label': 'Status',
        display: row => {
            if (row.status === 'Check In') {
                return <SpanStyledCheckIn>{row.status}</SpanStyledCheckIn>
            } else if (row.status === 'Check Out') {
                return <SpanStyledCheckOut>{row.status}</SpanStyledCheckOut>
            } else {
                return <SpanStyledInProgress>{row.status}</SpanStyledInProgress>
            }
        }
    },
    {
        'label': 'Actions',
        display: row => action()
    }
];

const BookingsPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const data = useSelector(getAllBookings);
    const status = useSelector(bookingsStatus);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getBookings());
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
                <ButtonStyledNew as={LinkStyled} to={'booking'}>+ New Booking</ButtonStyledNew>
                <OrderComponent data={bookingsOrder} />
            </div>
            <TabsComponent data={bookings}></TabsComponent>
            <TableComponent rows={data} columns={dataTable} path={'bookings'}></TableComponent>
        </section>


    );
}

export default BookingsPage;