import { users } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import data from "../assets/data/users.json";

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
        display: row => row.status ? 'Active' : 'Inactive'
    }
];

const UsersPage = () => {

    return (
        <section className='content'>
            <TabsComponent data={users}></TabsComponent>
            <TableComponent rows={data.toSpliced(10, 40)} columns={dataTable}></TableComponent>
        </section>
    );
}

export default UsersPage;