import { message } from "../assets/data/tabs";
import TableComponent from "../components/TableComponent";
import TabsComponent from "../components/TabsComponent";
import MessageListComponent from './../components/MessageListComponent';
import { ButtonStyledArchived, ButtonStyledIcon, ButtonStyledPublish } from "../styled/ButtonStyled";
import { useEffect, useMemo, useState } from "react";
import { deleteMessage, editMessage, getMessages } from "../features/messages/messagesAsyncThunk";
import { getAllMessages } from "../features/messages/messagesSlice";
import Loading from "../components/Loading";
import { DeleteStyled } from './../styled/IconStyled';
import MySweetAlert from "../app/MySweetAlert";
import { DivStyledActions, SectionContent } from "../styled/DivStyled";
import { SpanStyledTableFirst, SpanStyledTableSecond } from "../styled/SpanStyled";
import { TAB_MESSAGE_INITIAL_STATE } from "../helpers/constants";
import { DataProperties, DataTableProps, HandleClickProps, iMessage } from "../entities/Data";
import { useAppDispatch, useAppSelector } from "../hook/useStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ActionPropsMessage {
    row: iMessage,
    dispatch: ThunkDispatch<RootState, any, any>
}

const handleClickDelete = async ({ event, dispatch, id }: HandleClickProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteMessage(id)).unwrap()
        const html = <p>Delete #{id} Message Successfully</p>
        MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
    } catch (error) {
        console.log(error)
    }
}

const handleClickArchive = ({ event, dispatch, id }: HandleClickProps) => {
    event.stopPropagation();
    dispatch(editMessage({ id: id, data: { archived: true } as iMessage }));
}

const action = ({ row, dispatch }: ActionPropsMessage) => {
    return (
        <DivStyledActions>
            {row.archived ?
                <ButtonStyledPublish onClick={(event) => event.stopPropagation()}>Publish</ButtonStyledPublish>
                :
                <ButtonStyledArchived onClick={(event) => handleClickArchive({ event, dispatch, id: row._id || '' })}>Archive</ButtonStyledArchived>
            }
            <ButtonStyledIcon onClick={(event) => handleClickDelete({ event, dispatch, id: row._id || '' })}><DeleteStyled></DeleteStyled></ButtonStyledIcon>
        </DivStyledActions>
    )
}

const dataTable = ({ dispatch }: DataTableProps): DataProperties[] => [
    {
        'label': 'Date',
        display: (row: iMessage) => {
            const date = new Date(parseInt(row.date, 10));
            return (<><SpanStyledTableFirst>{date.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{date.toTimeString().slice(0, 8)} </SpanStyledTableSecond><SpanStyledTableSecond>#{row._id}</SpanStyledTableSecond></>);
        }
    },
    {
        'label': 'Customer',
        display: (row: iMessage) => (<><SpanStyledTableFirst>{row.full_name}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{row.email}/</SpanStyledTableSecond><SpanStyledTableSecond>{row.phone}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Comment',
        display: (row: iMessage) => (<><SpanStyledTableFirst>Subject: </SpanStyledTableFirst><SpanStyledTableSecond>{row.subject.slice(0, 30).concat('...')}</SpanStyledTableSecond><br></br><SpanStyledTableFirst>Message: </SpanStyledTableFirst><SpanStyledTableSecond>{row.messages.slice(0, 50).concat('...')}</SpanStyledTableSecond></>)
    },
    {
        'label': 'Action',
        display: (row: iMessage) => action({ row, dispatch })
    }
];

const ContactPage = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string>(TAB_MESSAGE_INITIAL_STATE);
    const data = useAppSelector(getAllMessages);

    const filteredMessages = useMemo(() => {
        const all = data.filter((item) => currentTab === TAB_MESSAGE_INITIAL_STATE ? true : item.archived === true);
        return all;
    }, [data, currentTab]);

    const initialFetch = async () => {
        try {
            await dispatch(getMessages());
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if (isLoading) {
        return (
            <SectionContent>
                <Loading></Loading>
            </SectionContent>
        );
    }

    return (
        <SectionContent>
            <MessageListComponent />
            <TabsComponent setCurrentTab={setCurrentTab} data={message} currentTab={currentTab}></TabsComponent>
            <TableComponent rows={filteredMessages} columns={dataTable({ dispatch })} path={''}></TableComponent>
        </SectionContent>
    );
}

export default ContactPage;