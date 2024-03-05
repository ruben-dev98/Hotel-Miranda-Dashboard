import { users } from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";
import data from "../assets/data/users.json";

const dataTable = [
    {
        'label': 'Image',
        display: row => <img src={row.foto}/>
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
            <Tabs data={users}></Tabs>
            <Table rows={data} columns={dataTable}></Table>
        </section>
    );
}

export default UsersPage;