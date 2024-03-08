import { users } from "../assets/data/tabs";
import { usersOrder } from "../assets/data/order";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import data from "../assets/data/users.json";
import { SpanStyled, SpanStyledCheckOut } from "../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import OrderComponent from './../components/OrderComponent';
import { LinkStyled } from "../styled/LinkStyled";

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
        'label' : 'Actions',
        display: row => action(row.id)
    }
];

const UsersPage = () => {

    return (
            <section className='content'>
                <div className="top__menu-table">
                    <ButtonStyledNew as={LinkStyled} to={'user'}>+ New Employee</ButtonStyledNew>
                    <OrderComponent data={usersOrder}></OrderComponent>
                </div>
                <TabsComponent data={users}></TabsComponent>
                <TableComponent rows={data.toSpliced(10, 40)} columns={dataTable} path={'users'}></TableComponent>
            </section>
    );
}

export default UsersPage;