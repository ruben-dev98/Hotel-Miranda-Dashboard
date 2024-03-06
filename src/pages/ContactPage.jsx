import { message } from "../assets/data/tabs";
import messages from "../assets/data/messages.json";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";

const dataTable = [
    {
        'label': 'Date',
        display: row => `${new Date(parseInt(row.date)).toLocaleString('es-Es')} ${row.id}`
    },
    {
        'label': 'Customer',
        display: row => `${row.full_name} ${row.email} ${row.phone}`
    },
    {
        'label': 'Comment',
        display: row => `${row.subject} ${row.message}`
    },
    {
        'label': 'Action',
        display: row => <button>Archive</button> 
    }
];

const ContactPage = () => {

    return (
        <section className='content'>
            <TabsComponent data={message}></TabsComponent>
            <TableComponent  rows={messages} columns={dataTable}></TableComponent>
        </section>
    );
}

export default ContactPage;