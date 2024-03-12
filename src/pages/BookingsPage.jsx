import { bookings } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import { SpanStyledCancelled, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/SpanStyled";
import OrderComponent from "../components/OrderComponent";
import { bookingsOrder } from "../assets/data/order";
import Swal from 'sweetalert2'
import { LinkStyled } from "../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../features/bookings/bookingsSlice";
import { useCallback, useEffect, useState } from "react";
import { deleteBooking, editBooking, getBookings } from "../features/bookings/bookingsAsyncThunk";
import Loading from "../components/Loading";

const handleClickEdit = async (event, dispatch, row) => {
    event.stopPropagation();
    try {
        await dispatch(editBooking(row.id)).unwrap()
        Swal.fire({'title': 'Cancelación de Booking',
        'timer': 2000
        });
    } catch(error) {
        console.log(error)
    }
    
}

const handleClickDelete = async (event, dispatch, row) => {
    event.stopPropagation();
    try {
        await dispatch(deleteBooking(row.id)).unwrap();
        Swal.fire({'title': 'Eliminación de Booking',
        'timer': 2000
        });
    } catch(error) {
        console.log(error)
    }
}

const action = (row, dispatch) => {
    return (
    <>
        <ButtonStyledViewNotes onClick={(event) => handleClickDelete(event, dispatch, row)}>Delete</ButtonStyledViewNotes>
        <ButtonStyledViewNotes onClick={(event) => handleClickEdit(event, dispatch, row)}>Cancelada</ButtonStyledViewNotes>
    </>
    )
}

const dataTable = (dispatch) => [
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
            } else if(row.status === 'In Progress') {
                return <SpanStyledInProgress>{row.status}</SpanStyledInProgress>
            } else {
                return <SpanStyledCancelled>{row.status}</SpanStyledCancelled>
            }
        }
    },
    {
        'label': 'Actions',
        display: row => action(row, dispatch)
    }
];

const BookingsPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const data = useSelector(getAllBookings);

    const result = useCallback(async () => {
        try {
            await dispatch(getBookings()).unwrap();
            setShowSpinner(false);
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        result();
    }, [result]);


    return (
        <section className='content'>
            {showSpinner ? <Loading></Loading> :
                <>
                    <div className="top__menu-table">
                        <ButtonStyledNew as={LinkStyled} to={'booking'}>+ New Booking</ButtonStyledNew>
                        <OrderComponent data={bookingsOrder} />
                    </div>
                    <TabsComponent data={bookings}></TabsComponent>
                    <TableComponent rows={data} columns={dataTable(dispatch)} path={'bookings'}></TableComponent>
                </>
            }
        </section>


    );
}

export default BookingsPage;