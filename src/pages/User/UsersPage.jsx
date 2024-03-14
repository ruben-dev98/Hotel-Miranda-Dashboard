import { users } from "../../assets/data/tabs";
import { usersOrder } from "../../assets/data/order";
import TableComponent from "../../components/TableComponent";
import TabsComponent from "../../components/TabsComponent";
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst } from "../../styled/SpanStyled";
import { ButtonStyledIcon, ButtonStyledNew } from "../../styled/ButtonsStyled";
import OrderComponent from '../../components/OrderComponent';
import { LinkStyled } from "../../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllEmployees } from "../../features/employees/employeesSlice";
import { deleteEmployee, getEmployees } from "../../features/employees/employeesAsyncThunk";
import Loading from "../../components/Loading";
import { useDebounce } from "@uidotdev/usehooks";
import { DeleteStyled, EditStyled } from "../../styled/IconStyled";
import { DivStyledActions } from "../../styled/DivsStyled";
import MySwal from "../../app/MySwal";



const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteEmployee(id)).unwrap()
        const html = <p>Delete #{id} Employee Successfully</p>;
        MySwal('', html, false, 2000, 'succes', true);
    } catch(error) {
        console.log(error)
    }
}

const action = (id, dispatch) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled/></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete(event, dispatch, id)}><DeleteStyled/></ButtonStyledIcon>
        </DivStyledActions>
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
        display: row => <SpanStyledTableFirst>{row.description.slice(0, 20).concat('...')}</SpanStyledTableFirst>
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
                    <div className="top__menu-table">
                        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busqueda por nombre usuario"/>
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