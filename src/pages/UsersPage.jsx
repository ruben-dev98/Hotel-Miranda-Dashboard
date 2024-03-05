import { usersTabs } from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";
import usersData from "../assets/data/users.json";

const UserPage = () => {
    
    const dataTable = [
        {
            'label': 'Image',
            'property': 'foto'
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
            'display': row => new Date(row.start_date)
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
            'property': row => row.status ? 'Active' : 'Inactive'
        }
    ];

    return (
        <section className='content'>
            <Tabs data={usersTabs}></Tabs>
            <Table data={usersData} columns={dataTable}></Table>
        </section>
    );
}

export default UserPage;