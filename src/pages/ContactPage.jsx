import { message } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledPublish, ButtonStyledViewNotes } from "../styled/ButtonsStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteMessage, editMessage, getMessages } from "../features/messages/messagesAsyncThunk";
import { getAllMessages } from "../features/messages/messagesSlice";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteMessage(id)).unwrap()
        Swal.fire({'title': 'Eliminación de Message',
        'timer': 2000
        });
    } catch(error) {
        console.log(error)
    }
}

const handleClickArchive = (event, dispatch, id) => {
    event.stopPropagation();
    dispatch(editMessage(id));
}

const action = (row, dispatch) => {
    return (<>
            <ButtonStyledViewNotes onClick={(event) => handleClickDelete(event, dispatch, row.id)}>Delete</ButtonStyledViewNotes>
            {row.archived ?
            <ButtonStyledPublish onClick={(event) => event.stopPropagation()}>Publish</ButtonStyledPublish>
            :
            <ButtonStyledArchived onClick={(event) => handleClickArchive(event, dispatch, row.id)}>Archive</ButtonStyledArchived>
            }
        </>
        )
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
        display: row => `${row.subject} ${row.messages}`
    },
    {
        'label': 'Action',
        display: row => action(row, dispatch)
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