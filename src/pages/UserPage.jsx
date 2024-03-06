import FormComponent from '../components/Form/FormComponent';
import dataUser from '../assets/data/users.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const object__fields = ['id', 'foto','full_name', 'start_date', 'description', 'contact', 'status'];

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const onCreateUser = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => {
            if(control.input === 'file') {
                return event.target[control.name].file;
            }
            return event.target[control.name].value
        });
        
    }

    useEffect(() => {
        setUser(dataUser.find((user) => user.id === parseInt(id)));
    }, [id]);


    return (
        <section className="content">
            <FormComponent data={user} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateUser}></FormComponent>
        </section>
    )
}

export default UserPage;