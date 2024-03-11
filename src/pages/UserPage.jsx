import FormComponent from '../components/Form/FormComponent';
import dataUser from '../assets/data/users.json';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { employeeStatus, getOneEmployee } from '../features/employees/employeesSlice';
import { getEmployee } from '../features/employees/employeesAsyncThunk';

const formControl = [
    {
        'label': 'Foto',
        'input': 'text',
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
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useSelector(getOneEmployee);
    const status = useSelector(employeeStatus);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateUser = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => {
            return event.target[control.name].value
        });
        
    }
    useEffect(() => {
        if(status === 'idle') {
            dispatch(getEmployee(parseInt(id)));
        } else if (status === 'pending') {
            setShowSpinner(true);
        } else if (status === 'fulfilled') {
            setShowSpinner(false);
        }
    }, [status, dispatch, id])

    return (
        showSpinner ? <span>Loading</span> :
        <section className="content">
            <FormComponent path={loc} data={user} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateUser}></FormComponent>
        </section>
    )
}

export default UserPage;