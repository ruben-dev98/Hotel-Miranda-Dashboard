import FormComponent from '../../components/Form/FormComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOneEmployee } from '../../features/employees/employeesSlice';
import { addEmployee, editEmployee, getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import { FormControlPropsEmployee, iEmployee } from '../../entities/Data';
import { useAppDispatch, useAppSelector } from '../../hook/useStore';

interface FormData extends EventTarget {
    photo: HTMLFormElement,
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
        'name': 'photo'
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
    const [isLoading, setIsLoading] = useState(true);
    const user = useAppSelector(getOneEmployee);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: iEmployee = {
            photo: '',
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
            (user[control.name] as string) = element[control.name].value;
        });
        try {
            if (loc.includes('edit')) {
                await dispatch(editEmployee({ id: id || '', data: user })).unwrap();
            } else {
                await dispatch(addEmployee(user)).unwrap();
            }
            navigate('/users');
        } catch(error) {
            console.error(error);
        }
    }

    const initialFetch = async () => {
        await dispatch(getEmployee(id || '')).unwrap();
        setIsLoading(false);
    };

    useEffect(() => {
        initialFetch();
    }, [])

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <FormComponent data={user} formControl={formControl} onHandleSubmit={onCreateUser}></FormComponent>
        </section>
    )
}

export default UserFormPage;