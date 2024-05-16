import { users } from "../../assets/data/tabs";
import { usersOrder } from "../../assets/data/order";
import TableComponent from "../../components/TableComponent";
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import { ButtonStyledIcon } from "../../styled/ButtonStyled";
import { LinkStyled } from "../../styled/LinkStyled";
import { useEffect, useMemo, useState } from "react";
import { getAllEmployees } from "../../features/employees/employeesSlice";
import { deleteEmployee, getEmployees } from "../../features/employees/employeesAsyncThunk";
import Loading from "../../components/Loading";
import { useDebounce } from "@uidotdev/usehooks";
import { DeleteStyled, EditStyled, ImgPersonStyled } from "../../styled/IconStyled";
import { DivStyledActions, SectionContent } from "../../styled/DivStyled";
import MySweetAlert from "../../app/MySweetAlert";
import { ORDER_EMPLOYEE_INITIAL_STATE, TAB_EMPLOYEE_INITIAL_STATE } from "../../helpers/constants";
import { ActionProps, DataProperties, DataTableProps, HandleClickProps, iEmployee } from "../../entities/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import styled from "styled-components";
import TableOptions from "../../components/TableOptions";



const handleClickDelete = async ({ event, dispatch, id }: HandleClickProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteEmployee(id)).unwrap()
        const html = <p>Delete #{id} Employee Successfully</p>;
        MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
    } catch (error) {
        console.log(error);
    }
}

const action = ({ id, dispatch }: ActionProps) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled /></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete({ event, dispatch, id })}><DeleteStyled /></ButtonStyledIcon>
        </DivStyledActions>
    )
}

const dataTable = ({ dispatch }: DataTableProps): DataProperties[] => [
    {
        'label': 'Image',
        display: (row: iEmployee) => <ImgPersonStyled src={row.photo} />
    },
    {
        'label': 'Information',
        display: (row: iEmployee) => (
            <>
                <SpanStyledTableFirst>{row.full_name}</SpanStyledTableFirst><br />
                <SpanStyledTableFirst>{row.email}</SpanStyledTableFirst><br />
                <SpanStyledTableSecond>#{row._id}</SpanStyledTableSecond>
            </>
        )

    },
    {
        'label': 'Start Date',
        display: (row: iEmployee) => {
            const start_date = new Date(parseInt(row.start_date, 10));
            return (<><SpanStyledTableFirst>{start_date.toDateString().slice(3)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>{start_date.toTimeString().slice(0, 8)}</SpanStyledTableSecond></>);
        }
    },
    {
        'label': 'Description',
        display: (row: iEmployee) => <SpanStyledTableFirst>{row.description.slice(0, 20).concat('...')}</SpanStyledTableFirst>
    },
    {
        'label': 'Contact',
        'property': 'contact'
    },
    {
        'label': 'Status',
        display: (row: iEmployee) => row.status ?
            <SpanStyled>Active</SpanStyled> :
            <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
    },
    {
        'label': 'Actions',
        display: (row: iEmployee) => action({ id: row._id || '', dispatch })
    }
];

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch: ThunkDispatch<RootState, any, any> = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string>(TAB_EMPLOYEE_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState(ORDER_EMPLOYEE_INITIAL_STATE);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const data = useAppSelector(getAllEmployees);

    const filteredUsers = useMemo(() => {
        if (!data) {
            return data;
        }
        const all = data.filter((item) => item.full_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const all_search = all.filter((item) => currentTab === TAB_EMPLOYEE_INITIAL_STATE ? true : currentTab === 'active' ? item.status === true : item.status === false);
        const orderType = currentOrder as keyof iEmployee;
        return all_search.sort((a, b) => {
            if ((a[orderType] || '') > (b[orderType] || '')) {
                return 1;
            } else if ((a[orderType] || '') < (b[orderType] || '')) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab, debouncedSearchTerm]);

    const initialFetch = async () => {
        try {
            await dispatch(getEmployees()).unwrap();
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
            <SectionContent className='content'>
                <Loading></Loading>
            </SectionContent>
        );
    }

    return (
        <SectionContent>
            <TableOptions 
            currentTab={currentTab} 
            data={users} 
            dataOrder={usersOrder} 
            searchTerm={searchTerm} 
            setCurrentOrder={setCurrentOrder} 
            setCurrentTab={setCurrentTab} 
            setSearchTerm={setSearchTerm} 
            isUserOrBooking 
            path="user"/>
            <TableComponent rows={filteredUsers} columns={dataTable({ dispatch })} path={'users'}></TableComponent>
        </SectionContent>
    );
}

export default UsersPage;