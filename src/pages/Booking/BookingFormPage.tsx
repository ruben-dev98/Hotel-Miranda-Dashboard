import { useLocation, useNavigate, useParams } from "react-router-dom";
import { lastId } from "../../app/getItenId";
import FormComponent from '../../components/Form/FormComponent';
import { useEffect, useState } from "react";
import { addBooking, editBooking, getBooking } from "../../features/bookings/bookingsAsyncThunk";
import { getAllBookings, getOneBooking } from "../../features/bookings/bookingSlice";
import Loading from "../../components/Loading";
import { availableRooms } from "../../features/rooms/roomsSlice";
import { availableRoomsNumber } from "../../features/rooms/roomsAsyncThunk";
import MySwal from "../../app/MySwal";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { FormControlPropsBooking, iBooking } from "../../entitys/Data";

interface FormData extends EventTarget {
    full_name: HTMLFormElement, 
    check_in: HTMLFormElement,
    check_out: HTMLFormElement,
    number: HTMLFormElement,
    email: HTMLFormElement,
    phone: HTMLFormElement,
    special_request: HTMLFormElement

}

const formControl = (rooms: string[]): FormControlPropsBooking[]  => [
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
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const booking = useAppSelector(getOneBooking);
    const bookings = useAppSelector(getAllBookings);
    const rooms = useAppSelector(availableRooms);

    const onCreateBooking = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newId = lastId(bookings);
        const booking: iBooking = {
            id: newId,
            full_name: '',
            order_date: Date.now().toString(),
            check_in: '',
            check_out: '',
            special_request: '',
            number: 0,
            phone: '',
            email: '',
            status: 'In Progress',
            amenities: [],
            type: '',
            description: '',
            price: 0,
            room_status: '',
            foto: ''
        }

        formControl(rooms).forEach((control) => {
            const element = event.target as FormData;
            const property = control.name as keyof iBooking;
            if(control.input === 'date') {
                (booking[property] as string) = String(new Date(element[control.name].value).getTime());
            } else {
                (booking[property] as string | number) = element[control.name].value;
            }
        });

        const html = id ? <p>Update #{booking.id} Booking Successfully</p> : <p>Create #{booking.id} Booking Successfully</p>;

        if (loc.includes('edit')) {
            try {
                navigate('/bookings');
                await dispatch(editBooking({id: parseInt(id || ''), data: booking}));
                MySwal({title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true});
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/bookings');
                await dispatch(addBooking(booking));
                MySwal({title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true});
            } catch (error) {
                console.log(error);
            }
        }
    }

    const initialFetch = async () => {
        await dispatch(availableRoomsNumber()).unwrap();
        await dispatch(getBooking(parseInt(id || ''))).unwrap();
        setIsLoading(false);
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
        <section className="content">
            <FormComponent formControl={formControl(rooms)} data={booking} onHandleSubmit={onCreateBooking}></FormComponent>
        </section>
    );

}

export default BookingFormPage;