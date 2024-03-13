import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { getOneEmployee } from '../../features/employees/employeesSlice';
import { getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import DetailsComponent from '../../components/Details/DetailsComponent';

const object__fields = [
    {
        'field': 'id',
        'type': 'text'
    },
    {
        'field': 'start_date',
        'type': 'date'
    },
    {
        'field': 'full_name',
        'type': 'text'
    },
    {
        'field': 'contact',
        'type': 'text'
    },
    {
        'field': 'foto',
        'type': 'img'
    },
    {
        'field': 'description',
        'type': 'text'
    },
    {
        'field': 'email',
        'type': 'text'
    },
    {
        display: data => data.status ? 'Activo' : 'Inactivo',
        'type': 'text'
    }
];

const UserPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useSelector(getOneEmployee);
    const { id } = useParams();

    const result = useCallback(async () => {
        try {
            await dispatch(getEmployee(parseInt(id))).unwrap();
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
            {showSpinner ? <Loading></Loading> : <>
                <DetailsComponent data={user} object__fields={object__fields}></DetailsComponent>
            </>}
        </section>
    )
}

export default UserPage;