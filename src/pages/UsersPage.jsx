import { users } from "../assets/data/tabs";
import { usersOrder } from "../assets/data/order";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import { SpanStyled, SpanStyledCheckOut } from "../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import OrderComponent from './../components/OrderComponent';
import { LinkStyled } from "../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { employeesStatus, getAllEmployees } from "../features/employees/employeesSlice";
import { getEmployees } from "../features/employees/employeesAsyncThunk";
import Loading from "../components/Loading";

const action = (id) => {
    return <ButtonStyledViewNotes as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}>Edit</ButtonStyledViewNotes>
}

const dataTable = [
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
        display: row => action(row.id)
    }
];

const UsersPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const data = useSelector(getAllEmployees);

    const result = useCallback(async () => {
        await dispatch(getEmployees()).unwrap();
        setShowSpinner(false);
    }, [dispatch]);

    useEffect(() => {
        result();
    }, [result]);


    return (
        <section className='content'>
            {showSpinner ? <Loading></Loading> :
                <>
                    <div className="top__menu-table">
                        <ButtonStyledNew as={LinkStyled} to={'user'}>+ New Employee</ButtonStyledNew>
                        <OrderComponent data={usersOrder}></OrderComponent>
                    </div>
                    <TabsComponent data={users}></TabsComponent>
                    <TableComponent rows={data} columns={dataTable} path={'users'}></TableComponent>
                </>
            }
        </section>
    );
}

export default UsersPage;