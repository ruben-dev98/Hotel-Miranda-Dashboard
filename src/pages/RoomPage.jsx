import dataRoom from '../assets/data/rooms.json';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormComponent from '../components/Form/FormComponent';

const formControl = [
    {
        'label': 'Foto',
        'input': 'image',
        'name': 'foto'
    },
    {
        'label': 'Room Type',
        'input': 'select',
        'data': ['Single Bed', 'Double Bed', 'Double Superior', 'Suite'],
        'name': 'full_name'
    },
    {
        'label': 'Puesto',
        'input': 'select',
        'data': ['Manager', 'Recepción', 'Servicio de Habitaciones'],
        'name': ''
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
        'label': 'Start Date',
        'input': 'date',
        'name': 'start_date'
    },
    {
        'label': 'Description',
        'input': 'textarea',
        'name': 'special_request'
    },
    {
        'label': 'Status',
        'input': 'select',
        'data': ['Activo', 'Inactivo'],
        'name': 'status'
    },
    {
        'label': 'Password',
        'input': 'password',
        'name': 'password'
    },
]

const object__fields = ['id', 'foto','full_name', 'start_date', 'description', 'contact', 'status'];


const RoomPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    const onCreateRoom = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => event.target[control.name].value);
        
    }

    useEffect(() => {
        setRoom(dataRoom.find((room) => room.id === parseInt(id)));
    }, [id]);


    return (
        <section className="content">
            <FormComponent data={room} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateRoom}></FormComponent>
        </section>
    )
}

export default RoomPage;