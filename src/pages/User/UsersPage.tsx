import { users } from "../../assets/data/tabs";
import { usersOrder } from "../../assets/data/order";
import TableComponent from "../../components/TableComponent";
import TabsComponent from "../../components/TabsComponent";
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst } from "../../styled/SpanStyled";
import { ButtonStyledIcon, ButtonStyledNew } from "../../styled/ButtonStyled";
import OrderComponent from '../../components/OrderComponent';
import { LinkStyled } from "../../styled/LinkStyled";
import { useEffect, useMemo, useState } from "react";
import { getAllEmployees } from "../../features/employees/employeesSlice";
import { deleteEmployee, getEmployees } from "../../features/employees/employeesAsyncThunk";
import Loading from "../../components/Loading";
import { useDebounce } from "@uidotdev/usehooks";
import { DeleteStyled, EditStyled } from "../../styled/IconStyled";
import { DivStyledActions } from "../../styled/DivStyled";
import MySwal from "../../app/MySwal";
import { InputSearch } from "../../styled/InputStyled";
import { ORDER_EMPLOYEE_INITIAL_STATE, TAB_EMPLOYEE_INITIAL_STATE } from "../../helpers/varHelpers";
import { ActionProps, DataProperties, DataTableProps, HandleClickDeleteProps, iEmployee } from "../../entitys/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const handleClickDelete = async ({event, dispatch, id}: HandleClickDeleteProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteEmployee(id)).unwrap()
        const html = <p>Delete #{id} Employee Successfully</p>;
        MySwal({title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true});
        
    } catch(error) {
        console.log(error);
    }
}

const action = ({id, dispatch}: ActionProps) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled /></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete({event, dispatch, id})}><DeleteStyled /></ButtonStyledIcon>
        </DivStyledActions>
    )
}

const dataTable = ({dispatch}: DataTableProps): DataProperties[] => [
    {
        'label': 'Image',
        display: (row: iEmployee) => <img src={row.foto} />
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
        display: (row: iEmployee) => new Date(row.start_date).toLocaleDateString('es-Es')
    },
    {
        'label': 'Description',
        display: (row: iEmployee) => <SpanStyledTableFirst>{row.description.slice(0, 20).concat('...')}</SpanStyledTableFirst>
    },
    {
        'label': 'Contact',
        'property': 'contact'
    },
    {
        'label': 'Status',
        display: (row: iEmployee) => row.status ?
            <SpanStyled>Active</SpanStyled> :
            <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
    },
    {
        'label': 'Actions',
        display: (row: iEmployee) => action({id: row.id, dispatch})
    }
];

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch: ThunkDispatch<RootState, any, any> = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean>(TAB_EMPLOYEE_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState(ORDER_EMPLOYEE_INITIAL_STATE);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const data = useAppSelector(getAllEmployees);

    const filteredUsers = useMemo(() => {
        const all = data.filter((item) => item.full_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const all_search = all.filter((item) => currentTab === TAB_EMPLOYEE_INITIAL_STATE ? true : item.status === currentTab);
        const orderType = currentOrder as keyof iEmployee;
        return all_search.sort((a, b) => {
            if (a[orderType] > b[orderType]) {
                return 1;
            } else if (a[orderType] < b[orderType]) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab, debouncedSearchTerm]);

    const inititalFecth = async () => {
        try {
            await dispatch(getEmployees()).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        inititalFecth();
    }, []);

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className='content'>
            <>
                <div className="top__menu-table">
                    <InputSearch value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busqueda por nombre usuario" />
                    <ButtonStyledNew as={LinkStyled} to={'user'}>+ New Employee</ButtonStyledNew>
                    <OrderComponent setCurrentOrder={setCurrentOrder} data={usersOrder}></OrderComponent>
                </div>
                <TabsComponent setCurrentTab={setCurrentTab} data={users} currentTab={currentTab}></TabsComponent>
                <TableComponent rows={filteredUsers} columns={dataTable({dispatch})} path={'users'}></TableComponent>
            </>
        </section>
    );
}

export default UsersPage;