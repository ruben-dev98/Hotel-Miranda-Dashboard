import { bookings } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import dataBookings from '../assets/data/bookings.json';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/SpanStyled";

const handleClickEdit = (id, event, nav) => {
    event.stopPropagation();
    nav(`booking/${id}`);
}

const action = (id, nav) => {
    return <ButtonStyledViewNotes onClick={(event) => handleClickEdit(id, event, nav)}>Edit</ButtonStyledViewNotes>
} 

const dataTable = (nav) =>  [
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
        <ButtonStyledViewNotes onClick={(event) => event.stopPropagation()}>View Notes</ButtonStyledViewNotes> 
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
            if(row.status === 'Check In') {
                return <SpanStyledCheckIn>{row.status}</SpanStyledCheckIn>
            } else if (row.status === 'Check Out') {
                return <SpanStyledCheckOut>{row.status}</SpanStyledCheckOut>
            } else {
                return <SpanStyledInProgress>{row.status}</SpanStyledInProgress>
            }
        }
    },
    {
        'label' : 'Actions',
        display: row => action(row.id, nav)
    }
];

const BookingsPage = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    

    return (
            loc.pathname !== "/bookings" ? 
                <Outlet/>
            :
                <section className='content'>
                    <button onClick={() => navigate('booking')}>+ New Booking</button>
                    <TabsComponent data={bookings}></TabsComponent>
                    <TableComponent rows={dataBookings.toSpliced(10, 30)} columns={dataTable(navigate)} path={'booking'}></TableComponent>
                </section>
        
        
    );
}

export default BookingsPage;