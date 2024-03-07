import { message } from "../assets/data/tabs";
import messages from "../assets/data/messages.json";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledPublish } from "../styled/ButtonsStyled";
import { messageOrder } from "../assets/data/order";
import OrderComponent from "../components/OrderComponent";

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
        display: row => row.archived ?
        <ButtonStyledPublish>Publish</ButtonStyledPublish>
        :
        <ButtonStyledArchived>Archive</ButtonStyledArchived>
    }
];

const ContactPage = () => {

    return (
        <section className='content'>
            <MessageListComponent/>
            <div className="top__menu-table">
                <OrderComponent data={messageOrder}/>
            </div>
            <TabsComponent data={message}></TabsComponent>
            <TableComponent  rows={messages.toSpliced(10, 30)} columns={dataTable} path={''}></TableComponent>
        </section>
    );
}

export default ContactPage;