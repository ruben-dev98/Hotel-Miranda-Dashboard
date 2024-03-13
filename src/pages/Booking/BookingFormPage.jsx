import { useLocation, useNavigate, useParams } from "react-router-dom";
import { lastId } from "../../app/getItemsId";
import FormComponent from '../../components/Form/FormComponent';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addBooking, editBooking, getBooking } from "../../features/bookings/bookingsAsyncThunk";
import { getAllBookings, getOneBooking } from "../../features/bookings/bookingsSlice";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { availableRooms } from "../../features/rooms/roomsSlice";
import { availableRoomsNumber } from "../../features/rooms/roomsAsyncThunk";

const formControl = (rooms) => [
    {
        'label': 'Nombre y Apellidos',
        'input': 'text',
        'name': 'full_name'
    },
    {
        'label': 'Check In',
        'input': 'date',
        'name': 'check_in'
    },
    {
        'label': 'Check Out',
        'input': 'date',
        'name': 'check_out'
    },
    {
        'label': 'Room Number',
        'input': 'select',
        'data': rooms,
        'name': 'number'
    },
    {
        'label': 'Email',
        'input': 'email',
        'name': 'email'
    },
    {
        'label': 'Phone',
        'input': 'text',
        'name': 'phone'
    },
    {
        'label': 'Special Request',
        'input': 'textarea',
        'name': 'special_request'
    }
]

const BookingFormPage = () => {
    const navigate = useNavigate();
    const loc = useLocation().pathname;
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const { id } = useParams();
    const booking = useSelector(getOneBooking);
    const bookings = useSelector(getAllBookings);
    const rooms = useSelector(availableRooms);

    const onCreateBooking = async (event) => {
        event.preventDefault();
        const newId = lastId(bookings);
        const booking = {
            id: newId,
            full_name: '',
            order_date: Date.now(),
            check_in: '',
            check_out: '',
            special_request: '',
            number: '',
            phone: '',
            email: '',
            status: 'In Progress',
            amenities: [],
            type: '',
            description: ''
        }
        
        formControl(rooms).forEach((control) => {
            if(control.input === 'date') {
                booking[control.name] = new Date(event.target[control.name].value).getTime();
            } else {
                booking[control.name] = event.target[control.name].value;
            }
        });

        if(loc.includes('edit')) {
            try {
                navigate('/bookings');
                await dispatch(editBooking({id: id, data: booking}));
                Swal.fire({
                    'title': 'Update de Booking Realizada',
                    'html': `
                        <p>ID : ${booking.id}</p>
                        <p>Check In : ${new Date(booking.check_in).toLocaleString('es-ES')}</p>
                        <p>Check Out : ${new Date(booking.check_out).toLocaleString('es-ES')}</p>
                        <p>Phone : ${booking.phone}</p>
                        <p>Email : ${booking.email}</p>
                        <p>Room Number : ${booking.number}</p>
                    `,
                    'timer': 2000
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/bookings');
                await dispatch(addBooking(booking));
                Swal.fire({
                    'title': 'Create de Booking Realizada',
                    'html': `
                        <p>ID : ${booking.id}</p>
                        <p>Check In : ${new Date(booking.check_in).toLocaleString('es-ES')}</p>
                        <p>Check Out : ${new Date(booking.check_out).toLocaleString('es-ES')}</p>
                        <p>Phone : ${booking.phone}</p>
                        <p>Email : ${booking.email}</p>
                        <p>Room Number : ${booking.number}</p>
                    `,
                    'timer': 2000
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const result = useCallback(async () => {
        await dispatch(availableRoomsNumber()).unwrap();
        await dispatch(getBooking(parseInt(id))).unwrap();
        setShowSpinner(false);
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result]);

    return (
        <section className="content">
            {showSpinner ? <Loading></Loading> :
                <FormComponent path={loc} formControl={formControl(rooms)} data={booking} onHandleSubmit={onCreateBooking}></FormComponent>}
        </section>
    );

}

export default BookingFormPage;