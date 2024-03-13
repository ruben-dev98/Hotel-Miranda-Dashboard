import { message } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledPublish } from "../styled/ButtonsStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { editMessage, getMessages } from "../features/messages/messagesAsyncThunk";
import { getAllMessages } from "../features/messages/messagesSlice";
import Loading from "../components/Loading";

const handleClickArchive = (dispatch, id) => {
    dispatch(editMessage(id));
}

const dataTable = (dispatch) => [
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
            <ButtonStyledArchived onClick={() => handleClickArchive(dispatch, row.id)}>Archive</ButtonStyledArchived>
    }
];

const ContactPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const [currentTab, setCurrentTab] = useState('All Contacts');
    const data = useSelector(getAllMessages);

    const filteredMessages = useMemo(() => {
        
        const all = currentTab === 'All Contacts'
            ? data
            : data.filter((item) => item.archived === currentTab);

        return all;
    }, [data, currentTab]);

    const result = useCallback(async () => {
        try {
        await dispatch(getMessages()).unwrap();
        setShowSpinner(false);
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        result();
    }, [result]);


    return (
            <section className='content'>
                {showSpinner ? <Loading></Loading> :
                    <>
                        <MessageListComponent />
                        <TabsComponent setCurrentTab={setCurrentTab} data={message}></TabsComponent>
                        <TableComponent rows={filteredMessages} columns={dataTable(dispatch)} path={''}></TableComponent>
                    </>
                }
            </section>
    );
}

export default ContactPage;