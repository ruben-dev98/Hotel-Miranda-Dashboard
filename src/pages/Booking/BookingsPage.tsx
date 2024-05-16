import { bookings } from "../../assets/data/tabs";
import TableComponent from "../../components/TableComponent";
import { ButtonStyledIcon, ButtonStyledViewNotes } from "../../styled/ButtonStyled";
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import { bookingsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { getAllBookings } from "../../features/bookings/bookingSlice";
import { useEffect, useMemo, useState } from "react";
import { deleteBooking, getBookings } from "../../features/bookings/bookingsAsyncThunk";
import Loading from "../../components/Loading";
import { DivStyledActions, SectionContent } from "../../styled/DivStyled";
import { DeleteStyled, EditStyled, ImgRoomPhotoStyled } from "../../styled/IconStyled";
import MySweetAlert from "../../app/MySweetAlert";
import { useDebounce } from "@uidotdev/usehooks";
import { ORDER_BOOKING_INITIAL_STATE, TAB_BOOKING_INITIAL_STATE } from "../../helpers/constants";
import { ActionProps, DataProperties, DataTableProps, HandleClickProps, iBooking } from "../../entities/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import TableOptions from "../../components/TableOptions";

const handleClickDelete = async ({ event, dispatch, id }: HandleClickProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteBooking(id)).unwrap();
        const html = <p>Delete #{id} Booking Successfully</p>;
        MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
    } catch (error) {
        console.log(error)
    }
}

const action = ({ id, dispatch }: ActionProps) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled /></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete({ event, dispatch, id })}><DeleteStyled /></ButtonStyledIcon>
        </DivStyledActions>
    )
}

const dataTable = ({ dispatch }: DataTableProps): DataProperties[] => [
    {
        'label': 'Image',
        display: (row: iBooking) => <ImgRoomPhotoStyled src={row.room.photo[0]} />
    },
    {
        'label': 'Guest',
        display: (row: iBooking) => (<><SpanStyledTableFirst>{row.full_name}</SpanStyledTableFirst><br /><SpanStyledTableSecond>#{row._id}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Order Date',
        display: (row: iBooking) => {
            const order_date = new Date(parseInt(row.order_date, 10));
            return (<><SpanStyledTableFirst>{order_date.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{order_date.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Check In',
        display: (row: iBooking) => {
            const check_in = new Date(parseInt(row.check_in, 10));
            return (<><SpanStyledTableFirst>{check_in.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{check_in.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Check Out',
        display: (row: iBooking) => {
            const check_out = new Date(parseInt(row.check_out, 10));
            return (<><SpanStyledTableFirst>{check_out.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{check_out.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        },
    },
    {
        'label': 'Special Request',
        display: (row: iBooking) => row.special_request ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                const title = 'Info Special Request';
                const html = (<p>{row.special_request}</p>);
                MySweetAlert({ title, html, showConfirmButton: false });
            }}>View Notes</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotes disabled>View Notes</ButtonStyledViewNotes>
    },
    {
        'label': 'Room Type',
        display: (row: iBooking) => (<><SpanStyledTableFirst>{row.room.type}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{row.room.number}</SpanStyledTableSecond></>)

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
            }
        }
    },
    {
        'label': 'Actions',
        display: (row: iBooking) => action({ id: row._id || '', dispatch })
    }
];

const BookingsPage = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string>(TAB_BOOKING_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState(ORDER_BOOKING_INITIAL_STATE);
    const data = useAppSelector(getAllBookings);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredBookings = useMemo(() => {
        if(!data) {
            return data;
        }
        const all = data.filter((item) => item.full_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const all_search = all.filter((item) => currentTab === TAB_BOOKING_INITIAL_STATE ? true : item.status === currentTab);
        const orderType = currentOrder as keyof iBooking;
        return all_search.sort((a, b) => {
            if ((a[orderType] || '') > (b[orderType] || '')) {
                return 1;
            } else if ((a[orderType] || '') < (b[orderType] || '')) {
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

    if (isLoading) {
        return (
            <SectionContent className='content'>
                <Loading></Loading>
            </SectionContent>
        );
    }

    return (
        <SectionContent>
            <TableOptions 
            currentTab={currentTab} 
            data={bookings} 
            dataOrder={bookingsOrder} 
            searchTerm={searchTerm} 
            setCurrentOrder={setCurrentOrder} 
            setCurrentTab={setCurrentTab} 
            setSearchTerm={setSearchTerm} 
            isUserOrBooking 
            path="booking"/>
            <TableComponent rows={filteredBookings} columns={dataTable({ dispatch })} path={'bookings'}></TableComponent>
        </SectionContent>
    );
}

export default BookingsPage;