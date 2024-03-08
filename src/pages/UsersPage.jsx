import { users } from "../assets/data/tabs";
import { usersOrder } from "../assets/data/order";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import data from "../assets/data/users.json"; 
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SpanStyled, SpanStyledCheckOut } from "../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import OrderComponent from './../components/OrderComponent';

const handleClickEdit = (id, event, nav) => {
    event.stopPropagation();
    nav(`edit/${id}`);
}

const action = (id, nav) => {
    return <ButtonStyledViewNotes onClick={(event) => handleClickEdit(id, event, nav)}>Edit</ButtonStyledViewNotes>
}

const dataTable = (nav) => [
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
        'label' : 'Actions',
        display: row => action(row.id, nav)
    }
];

const UsersPage = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    return (
        loc.pathname !== '/users' ?
            <Outlet></Outlet>
            :
            <section className='content'>
                <div className="top__menu-table">
                    <ButtonStyledNew onClick={() => navigate('user')}>+ New Employee</ButtonStyledNew>
                    <OrderComponent data={usersOrder}></OrderComponent>
                </div>
                <TabsComponent data={users}></TabsComponent>
                <TableComponent rows={data.toSpliced(10, 40)} columns={dataTable(navigate)} path={'user'}></TableComponent>
            </section>
    );
}

export default UsersPage;