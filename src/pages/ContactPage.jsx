import { messageTabs } from "../assets/data/tabs";
import Table from "../components/Table";
import Tabs from "../components/Tabs";

const ContactPage = () => {

    const dataTable = [
        {
            'label': 'Date',
            'display': row => `${new Date(row.date)} ${row.id}`
        },
        {
            'label': 'Customer',
            'display': row => `${row.full_name} ${row.email} ${row.phone}`
        },
        {
            'label': 'Comment',
            'display': row => `${row.subject} ${row.message}`
        },
        {
            'label': 'Action',
            'property': 'Archive'
        }
    ];

    return (
        <section className='content'>
            <Tabs data={messageTabs}></Tabs>
            {/*<Table rows={dataTable} columns={dataTable.length}></Table>*/}
        </section>
    );
}

export default ContactPage;