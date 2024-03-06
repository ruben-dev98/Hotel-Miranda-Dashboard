import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dataBookings from "../assets/data/bookings.json";
import FormComponent from './../components/Form/FormComponent';

const formControl = [
    {
        'label': 'Nombre y Apellidos',
        'input': 'text'
    },
    {
        'label': 'ID',
        'input': 'text'
    },
    {
        'label': 'Check In',
        'input': 'date'
    },
    {
        'label': 'Check Out',
        'input': 'date'
    },
    {
        'label': 'Room Info',
        'input': 'text'
    },
    {
        'label': 'Price',
        'input': 'number'
    },
    {
        'label': 'Special Request',
        'input': 'textarea'
    }
]

const object__fields = ['id', 'check_in', 'check_out', 'full_name', 'type', 'price', 'special_request'];

const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        setBooking(dataBookings.find((booking) => booking.id === parseInt(id)));
    }, [id]);

    return (
        <section className="content">
            <FormComponent formControl={formControl} data={booking} object__fields={object__fields}></FormComponent>
        </section>
    );

}


/*
Izquierda
Nombre y apellidos
ID de la reserva
Check in (Fecha de entrada)
Check out (Fecha de salida)
Room info (Número de habitación)
Price (Precio de la reserva completa)
Special request (el mensaje completo)
Amenities que incluye la habitación

A la derecha
Carrusel de fotos (de la habitación)
Tipo de habitación
Descripción (de la habitación)
Estado (CHECK IN verde, CHECK OUT rojo, IN PROGRESS amarillo)

*/

export default BookingPage;