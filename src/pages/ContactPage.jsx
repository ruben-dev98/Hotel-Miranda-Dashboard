import { message } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledIcon, ButtonStyledPublish } from "../styled/ButtonsStyled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { deleteMessage, editMessage, getMessages } from "../features/messages/messagesAsyncThunk";
import { getAllMessages } from "../features/messages/messagesSlice";
import Loading from "../components/Loading";
import { DeleteStyled } from './../styled/IconStyled';
import MySwal from "../app/MySwal";
import { DivStyledActions } from "../styled/DivsStyled";
import { SpanStyledTableFirst, SpanStyledTableSecond } from "../styled/SpanStyled";
import { TAB_MESSAGE_INITIAL_STATE } from "../helpers/varHelpers";

const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteMessage(id)).unwrap()
        const html = <p>Delete #{id} Message Successfully</p>
        MySwal('', html, false, 2000, 'success', true);
    } catch (error) {
        console.log(error)
    }
}

const handleClickArchive = (event, dispatch, id) => {
    event.stopPropagation();
    dispatch(editMessage(id));
}

const action = (row, dispatch) => {
    return (<DivStyledActions>
        {row.archived ?
            <ButtonStyledPublish onClick={(event) => event.stopPropagation()}>Publish</ButtonStyledPublish>
            :
            <ButtonStyledArchived onClick={(event) => handleClickArchive(event, dispatch, row.id)}>Archive</ButtonStyledArchived>
        }
        <ButtonStyledIcon onClick={(event) => handleClickDelete(event, dispatch, row.id)}><DeleteStyled></DeleteStyled></ButtonStyledIcon>
    </DivStyledActions>
    )
}

const dataTable = (dispatch) => [
    {
        'label': 'Date',
        display: row => {
            const date = new Date(parseInt(row.date, 10));
            return (<><SpanStyledTableFirst>{date.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{date.toTimeString().slice(0, 8)} </SpanStyledTableSecond><SpanStyledTableSecond>#{row.id}</SpanStyledTableSecond></>);
        }
    },
    {
        'label': 'Customer',
        display: row => (<><SpanStyledTableFirst>{row.full_name}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{row.email}/</SpanStyledTableSecond><SpanStyledTableSecond>{row.phone}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Comment',
        display: row => (<><SpanStyledTableFirst>Subject: </SpanStyledTableFirst><SpanStyledTableSecond>{row.subject.slice(0, 30).concat('...')}</SpanStyledTableSecond><br></br><SpanStyledTableFirst>Message: </SpanStyledTableFirst><SpanStyledTableSecond>{row.messages.slice(0, 50).concat('...')}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Action',
        display: row => action(row, dispatch)
    }
];

const ContactPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(TAB_MESSAGE_INITIAL_STATE);
    const data = useSelector(getAllMessages);

    const filteredMessages = useMemo(() => {
        const all = data.filter((item) => currentTab === TAB_MESSAGE_INITIAL_STATE ? true : item.archived === currentTab);
        return all;
    }, [data, currentTab]);

    const inititalFecth = async () => {
        try {
            await dispatch(getMessages()).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        inititalFecth();
    }, []);

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className='content'>
            <>
                <MessageListComponent />
                <TabsComponent setCurrentTab={setCurrentTab} data={message} currentTab={currentTab}></TabsComponent>
                <TableComponent rows={filteredMessages} columns={dataTable(dispatch)} path={''}></TableComponent>
            </>
        </section>
    );
}

export default ContactPage;