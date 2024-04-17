import FormComponent from '../../components/Form/FormComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOneEmployee } from '../../features/employees/employeesSlice';
import { addEmployee, editEmployee, getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import { FormControlPropsEmployee, iEmployee } from '../../entities/Data';
import { useAppDispatch, useAppSelector } from '../../hook/useStore';
import { SectionContent } from '../../styled/DivStyled';
import { existUserEmail } from '../../helpers/existUserEmail';
import MySweetAlertApi from '../../app/MySweetAlertApi';
import { userEmailAlreadyExist } from '../../helpers/constants';

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
        'label': 'Photo',
        'input': 'text',
        'name': 'photo'
    },
    {
        'label': 'Full Name',
        'input': 'text',
        'name': 'full_name'
    },
    {
        'label': 'Job',
        'input': 'select',
        'data': ['Manager', 'Receptionist', 'Room Service'],
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
        'data': ['Active', 'Inactive'],
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
    const { id } = useParams();

    const onCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {

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
            const element = event.target as FormData;
            const existEmployee = await existUserEmail(element['email'].value);
            if (existEmployee && !id) {
                MySweetAlertApi({ title: userEmailAlreadyExist, icon: 'error' });
                throw new Error(userEmailAlreadyExist);
            }
            formControl.forEach((control) => {
                if (control.name === 'status') {
                    (user[control.name] as boolean) = element[control.name].value === 'Active' ? true : false;
                } else {
                    (user[control.name] as string) = element[control.name].value;
                }

            });

            if (id) {
                await dispatch(editEmployee({ id: id || '', data: user })).unwrap();
            } else {
                await dispatch(addEmployee(user)).unwrap();
            }
            navigate('/users');
        } catch (error) {
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
        return (
            <SectionContent className='content'>
                <Loading></Loading>
            </SectionContent>
        );
    }

    return (
        <SectionContent>
            <FormComponent data={user} formControl={formControl} onHandleSubmit={onCreateUser}></FormComponent>
        </SectionContent>
    )
}

export default UserFormPage;