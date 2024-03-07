import FormComponent from '../components/Form/FormComponent';
import dataUser from '../assets/data/users.json';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const formControl = [
    {
        'label': 'Foto',
        'input': 'file',
        'name': 'foto'
    },
    {
        'label': 'Nombre y Apellidos',
        'input': 'text',
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
        'name': 'description'
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

const object__fields = [
    { 
        'field' : 'id',
        'type' : 'text'
    },
    { 
        'field' : 'start_date',
        'type' : 'date'
    },
    { 
        'field' : 'full_name',
        'type' : 'text'
    },
    { 
        'field' : 'contact',
        'type' : 'text'
    },
    { 
        'field' : 'foto',
        'type' : 'img'
    },
    { 
        'field' : 'description',
        'type' : 'text'
    },
    {
        'field' : 'email',
        'type' : 'text'
    },
    { 
        display : data => data.status ? 'Activo' : 'Inactivo',
        'type' : 'text'
    }
];

const UserPage = () => {
    const loc = useLocation().pathname;
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const onCreateUser = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => {
            if(control.input === 'file') {
                return event.target[control.name].value;
            }
            return event.target[control.name].value
        });
        
    }

    useEffect(() => {
        setUser(dataUser.find((user) => user.id === parseInt(id)));
    }, [id]);


    return (
        <section className="content">
            <FormComponent path={loc} data={user} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateUser}></FormComponent>
        </section>
    )
}

export default UserPage;