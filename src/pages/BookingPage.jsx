import { useNavigate, useParams } from "react-router-dom";
import { lastId } from "../app/getItemsId";
import FormComponent from './../components/Form/FormComponent';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addBooking, getBooking } from "../features/bookings/bookingsAsyncThunk";
import { getAllBookings, getOneBooking } from "../features/bookings/bookingsSlice";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { getAllRooms } from "../features/rooms/roomsSlice";
import { getRooms } from "../features/rooms/roomsAsyncThunk";

const sortRoomNumbers = (rooms) => {
    const roomsNumber = rooms.filter((room) => room.status === 'Available');
    return roomsNumber.sort((a, b) => {
        if (a.number > b.number) return 1;
        else if (a.number < b.number) return -1;
        else return 0
    });
}

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
        'data': sortRoomNumbers(rooms),
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

const object__fields = [
    {
        'field': 'id',
        'type': 'text'
    },
    {
        'field': 'check_in',
        'type': 'date'
    },
    {
        'field': 'check_out',
        'type': 'date'
    },
    {
        'field': 'full_name',
        'type': 'text'
    },
    {
        'field': 'number',
        'type': 'text'
    },
    {
        'field': 'special_request',
        'type': 'text'
    },
    {
        'field': 'price',
        'type': 'text'
    },
    {
        'field': 'foto',
        'type': 'swiper'
    },
    {
        'field': 'description',
        'type': 'text'
    },
    {
        'field': 'type',
        'type': 'text'
    },
    {
        'field': 'amenities',
        'type': 'array'
    },
    {
        'field': 'status',
        'type': 'text'
    }
];


const BookingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const { id } = useParams();
    const booking = useSelector(getOneBooking);
    const bookings = useSelector(getAllBookings);
    const rooms = useSelector(getAllRooms);

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
        
        formControl(rooms).map((control) => {
            if(control.input === 'date') {
                booking[control.name] = new Date(event.target[control.name].value).getTime();
            } else {
                booking[control.name] = event.target[control.name].value;
            }
        });

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

    const result = useCallback(async () => {
        await dispatch(getRooms()).unwrap();
        await dispatch(getBooking(parseInt(id))).unwrap();
        setShowSpinner(false);
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result]);

    return (

        <section className="content">
            {showSpinner ? <Loading></Loading> :
                <FormComponent path={''} formControl={formControl(rooms)} data={booking} object__fields={object__fields} onHandleSubmit={onCreateBooking}></FormComponent>}
        </section>
    );

}

export default BookingPage;