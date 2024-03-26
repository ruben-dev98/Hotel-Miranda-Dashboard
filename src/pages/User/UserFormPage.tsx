import FormComponent from '../../components/Form/FormComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getAllEmployees, getOneEmployee } from '../../features/employees/employeesSlice';
import { addEmployee, editEmployee, getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import { lastId } from '../../app/getItenId';
import MySwal from '../../app/MySwal';
import { FormControlPropsEmployee, iEmployee } from '../../entitys/Data';
import { useAppDispatch, useAppSelector } from '../../hook/useStore';

interface FormData extends EventTarget {
    foto: HTMLFormElement,
    full_name: HTMLFormElement,
    start_date: HTMLFormElement,
    job: HTMLFormElement,
    description: HTMLFormElement,
    email: HTMLFormElement,
    contact: HTMLFormElement,
    status: HTMLFormElement,
    password: HTMLFormElement
}

const formControl: FormControlPropsEmployee[] = [
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
        'name': 'job'
    },
    {
        'label': 'Email',
        'input': 'email',
        'name': 'email'
    },
    {
        'label': 'Phone',
        'input': 'text',
        'name': 'contact'
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

const UserFormPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useAppSelector(getOneEmployee);
    const users = useAppSelector(getAllEmployees);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newId = lastId(users);
        const user: iEmployee = {
            id: parseInt(id || '') || newId,
            foto: '',
            full_name: '',
            job: '',
            email: '',
            start_date: '',
            description: '',
            contact: '',
            status: false,
            password: ''
        };

        formControl.forEach((control) => {
            const element = event.target as FormData;
            user[control.name] = element[control.name].value;
        });

        const html = id ? <p>Update #{user.id} Employee Successfully</p> : <p>Create #{user.id} Employee Successfully</p>;

        if (loc.includes('edit')) {
            try {
                navigate('/users');
                await dispatch(editEmployee({ id: parseInt(id || ''), data: user })).unwrap();
                MySwal({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/users');
                await dispatch(addEmployee(user)).unwrap();
                MySwal({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const result = useCallback(async () => {
        try {
            await dispatch(getEmployee(parseInt(id || ''))).unwrap();
            setShowSpinner(false);
        } catch (error) {
            console.log(error);
        }
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result])

    return (
        <section className="content">
            {showSpinner ? <Loading></Loading> :
                <FormComponent data={user} formControl={formControl} onHandleSubmit={onCreateUser}></FormComponent>}
        </section>
    )
}

export default UserFormPage;