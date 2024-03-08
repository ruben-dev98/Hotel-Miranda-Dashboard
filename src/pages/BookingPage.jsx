import { useParams } from "react-router-dom";
import dataBookings from "../assets/data/bookings.json";
import dataRooms from "../assets/data/rooms.json";
import FormComponent from './../components/Form/FormComponent';

const sortRoomNumbers = () => {
    return dataRooms.map((room) => room.number).sort((a, b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
    });
}

const formControl = [
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
        'data': sortRoomNumbers(),
        'name': 'room_number'
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
    const { id } = useParams();
    const booking = dataBookings.find((booking) => booking.id === parseInt(id));

    const onCreateBooking = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => event.target[control.name].value);
    }

    return (
        <section className="content">
            <FormComponent path={''} formControl={formControl} data={booking} object__fields={object__fields} onHandleSubmit={onCreateBooking}></FormComponent>
        </section>
    );

}

export default BookingPage;