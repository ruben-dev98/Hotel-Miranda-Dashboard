import { message } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledPublish } from "../styled/ButtonsStyled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMessages } from "../features/messages/messagesAsyncThunk";
import { getAllMessages, messagesStatus } from "../features/messages/messagesSlice";

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
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const data = useSelector(getAllMessages);
    const status = useSelector(messagesStatus);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getMessages());
        } else if (status === 'pending') {
            setShowSpinner(true);
        } else if (status === 'fulfilled') {
            setShowSpinner(false);
        }
    }, [status, dispatch])


    return (
        showSpinner ? <span>Loading</span> :
        <section className='content'>
            <MessageListComponent/>
            <TabsComponent data={message}></TabsComponent>
            <TableComponent  rows={data} columns={dataTable} path={''}></TableComponent>
        </section>
    );
}

export default ContactPage;