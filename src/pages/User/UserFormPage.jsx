import FormComponent from '../../components/Form/FormComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { getAllEmployees, getOneEmployee } from '../../features/employees/employeesSlice';
import { addEmployee, editEmployee, getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import { lastId } from '../../app/getItemsId';
import MySwal from '../../app/MySwal';

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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(getOneEmployee);
    const users = useSelector(getAllEmployees);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateUser = async (event) => {
        event.preventDefault();
        const newId = lastId(users);
        const user = {
            id: id || newId,
            foto: '',
            full_name: '',
            email: '',
            start_date: '',
            description: '',
            contact: '',
            status: false,
            password: ''
        };

        formControl.forEach((control) => {
            user[control.name] = event.target[control.name].value;
        });

        const html = id ? <p>Update #{user.id} Employee Successfully</p> : <p>Create #{user.id} Employee Successfully</p>;

        if(loc.includes('edit')) {
            try {
                navigate('/users');
                await dispatch(editEmployee({id: id, data: user})).unwrap();
                MySwal('', html, false, 2000, 'success', true);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/users');
                await dispatch(addEmployee(user)).unwrap();
                MySwal('', html, false, 2000, 'success', true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const initialFetch = async () => {
        try {
            await dispatch(getEmployee(parseInt(id))).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <FormComponent path={loc} data={user} formControl={formControl} onHandleSubmit={onCreateUser}></FormComponent>
        </section>
    )
}

export default UserFormPage;