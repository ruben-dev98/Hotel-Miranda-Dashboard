import { bookings } from "../../assets/data/tabs";
import TableComponent from "../../components/TableComponent";
import TabsComponent from "../../components/TabsComponent";
import { ButtonStyledIcon, ButtonStyledNew, ButtonStyledViewNotes } from "../../styled/ButtonStyled";
import { SpanStyledCancelled, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import OrderComponent from "../../components/OrderComponent";
import { bookingsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../features/bookings/bookingSlice";
import { useEffect, useMemo, useState } from "react";
import { deleteBooking, getBookings } from "../../features/bookings/bookingsAsyncThunk";
import Loading from "../../components/Loading";
import { DivStyledActions } from "../../styled/DivStyled";
import { DeleteStyled, EditStyled } from "../../styled/IconStyled";
import MySwal from "../../app/MySwal";
import { useDebounce } from "@uidotdev/usehooks";
import { InputSearch } from "../../styled/InputStyled";
import { ORDER_BOOKING_INITIAL_STATE, TAB_BOOKING_INITIAL_STATE } from "../../helpers/varHelpers";
import { ActionProps, DataProperties, DataTableProps, HandleClickDeleteProps } from "../../entitys/Data";
import { iBooking } from './../../entitys/Data';
import { useAppDispatch, useAppSelector } from "../../hook/useStore";


/*const handleClickEdit = async (event, dispatch, row) => {
    event.stopPropagation();
    try {
        await dispatch(editBooking(row.id)).unwrap()
    } catch (error) {
        console.log(error)
    }
}*/

const handleClickDelete = async ({event, dispatch, id}: HandleClickDeleteProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteBooking(id)).unwrap();
        const html = <p>Delete #{id} Booking Successfully</p>;
        MySwal({title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true});
    } catch (error) {
        console.log(error)
    }
}

const action = ({id, dispatch}: ActionProps) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled/></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete({event, dispatch, id})}><DeleteStyled/></ButtonStyledIcon>
            {/*<ButtonStyledViewNotes onClick={(event) => handleClickEdit(event, dispatch, row)}>Cancelada</ButtonStyledViewNotes>*/}
        </DivStyledActions>
    )
}

const dataTable = ({dispatch}: DataTableProps): DataProperties[] => [
    {
        'label': 'Guest',
        display: (row: iBooking) => (<><SpanStyledTableFirst>{row.full_name}</SpanStyledTableFirst><br/><SpanStyledTableSecond>#{row.id}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Order Date',
        display: (row: iBooking) => {
            const order_date = new Date(parseInt(row.order_date, 10));
            return (<><SpanStyledTableFirst>{order_date.toDateString().slice(3)}</SpanStyledTableFirst><br/><SpanStyledTableSecond>{order_date.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Check In',
        display: (row: iBooking) => {
            const check_in = new Date(parseInt(row.check_in, 10));
            return (<><SpanStyledTableFirst>{check_in.toDateString().slice(3)}</SpanStyledTableFirst><br/><SpanStyledTableSecond>{check_in.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Check Out',
        display: (row: iBooking) => {
            const check_out = new Date(parseInt(row.check_out, 10));
            return (<><SpanStyledTableFirst>{check_out.toDateString().slice(3)}</SpanStyledTableFirst><br/><SpanStyledTableSecond>{check_out.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Special Request',
        display: (row: iBooking) => row.special_request ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                const title = 'Info Special Request';
                const html = (<p>${row.special_request}</p>);
                MySwal({title, html, showConfirmButton: false});
            }}>View Notes</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotes disabled>View Notes</ButtonStyledViewNotes>
    },
    {
        'label': 'Room Type',
        display: (row: iBooking) => (<><SpanStyledTableFirst>{row.type}</SpanStyledTableFirst><br/><SpanStyledTableSecond>{row.number}</SpanStyledTableSecond></>)

    },
    {
        'label': 'Status',
        display: (row: iBooking) => {
            if (row.status === 'Check In') {
                return <SpanStyledCheckIn>{row.status}</SpanStyledCheckIn>
            } else if (row.status === 'Check Out') {
                return <SpanStyledCheckOut>{row.status}</SpanStyledCheckOut>
            } else if (row.status === 'In Progress') {
                return <SpanStyledInProgress>{row.status}</SpanStyledInProgress>
            } else {
                return <SpanStyledCancelled>{row.status}</SpanStyledCancelled>
            }
        }
    },
    {
        'label': 'Actions',
        display: (row: iBooking) => action({id: row.id , dispatch})
    }
];

const BookingsPage = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean>(TAB_BOOKING_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState(ORDER_BOOKING_INITIAL_STATE);
    const data = useAppSelector(getAllBookings);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredBookings = useMemo(() => {
        const all = data.filter((item) => item.full_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const all_search = all.filter((item) => currentTab === TAB_BOOKING_INITIAL_STATE ? true : item.status === currentTab);
        const orderType = currentOrder as keyof iBooking;
        return all_search.sort((a, b) => {
            if (a[orderType] > b[orderType]) {
                return 1;
            } else if (a[orderType] < b[orderType]) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab, debouncedSearchTerm]);

    const initialFetch = async () => {
        try {
            await dispatch(getBookings()).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if(isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className='content'>
            <div className="top__menu-table">
                <InputSearch value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busqueda por nombre usuario"/>
                <ButtonStyledNew as={LinkStyled} to={'booking'}>+ New Booking</ButtonStyledNew>
                <OrderComponent setCurrentOrder={setCurrentOrder} data={bookingsOrder} />
            </div>
            <TabsComponent data={bookings} setCurrentTab={setCurrentTab} currentTab={currentTab}></TabsComponent>
            <TableComponent rows={filteredBookings} columns={dataTable({dispatch})} path={'bookings'}></TableComponent>
        </section>
    );
}

export default BookingsPage;