import { users } from "../../assets/data/tabs";
import { usersOrder } from "../../assets/data/order";
import TableComponent from "../../components/TableComponent";
import TabsComponent from "../../components/TabsComponent";
import { SpanStyled, SpanStyledCheckOut } from "../../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../../styled/ButtonsStyled";
import OrderComponent from '../../components/OrderComponent';
import { LinkStyled } from "../../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllEmployees } from "../../features/employees/employeesSlice";
import { deleteEmployee, getEmployees } from "../../features/employees/employeesAsyncThunk";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { useDebounce } from "@uidotdev/usehooks";

const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteEmployee(id)).unwrap()
        Swal.fire({'title': 'Eliminación de Employee',
        'timer': 2000
        });
    } catch(error) {
        console.log(error)
    }
}

const action = (id, dispatch) => {
    return (
        <>
            <ButtonStyledViewNotes onClick={(event) => handleClickDelete(event, dispatch, id)}>Delete</ButtonStyledViewNotes>
            <ButtonStyledViewNotes as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}>Edit</ButtonStyledViewNotes>
        </>
    )
}

const dataTable = (dispatch) =>  [
    {
        'label': 'Image',
        display: row => <img src={row.foto} />
    },
    {
        'label': 'Full Name',
        'property': 'full_name'
    },
    {
        'label': 'ID',
        'property': 'id'
    },
    {
        'label': 'Email',
        'property': 'email'
    },
    {
        'label': 'Start Date',
        display: row => new Date(row.start_date).toLocaleDateString('es-Es')
    },
    {
        'label': 'Description',
        'property': 'description'
    },
    {
        'label': 'Contact',
        'property': 'contact'
    },
    {
        'label': 'Status',
        display: row => row.status ?
            <SpanStyled>Active</SpanStyled> :
            <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
    },
    {
        'label': 'Actions',
        display: row => action(row.id, dispatch)
    }
];

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const [currentTab, setCurrentTab] = useState('All Employees');
    const [currentOrder, setCurrentOrder] = useState('start_date');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const data = useSelector(getAllEmployees);

    const filteredUsers = useMemo(() => {
        const all = data.filter((item) => item.full_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const all_search = currentTab === 'All Employees' 
        ? all
        : all.filter((item) => item.status === currentTab);

        return [...all_search].sort((a, b) => {
            if(a[currentOrder] > b[currentOrder]) {
                return 1;
            } else if(a[currentOrder] < b[currentOrder]) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab, debouncedSearchTerm]);

    const result = useCallback(async () => {
        try {
            await dispatch(getEmployees()).unwrap();
            setShowSpinner(false);
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        result();
    }, [result]);


    return (
        <section className='content'>
            {showSpinner ? <Loading></Loading> :
                <>
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busqueda por nombre usuario"/>
                    <div className="top__menu-table">
                        <ButtonStyledNew as={LinkStyled} to={'user'}>+ New Employee</ButtonStyledNew>
                        <OrderComponent setCurrentOrder={setCurrentOrder} data={usersOrder}></OrderComponent>
                    </div>
                    <TabsComponent setCurrentTab={setCurrentTab} data={users}></TabsComponent>
                    <TableComponent rows={filteredUsers} columns={dataTable(dispatch)} path={'users'}></TableComponent>
                </>
            }
        </section>
    );
}

export default UsersPage;