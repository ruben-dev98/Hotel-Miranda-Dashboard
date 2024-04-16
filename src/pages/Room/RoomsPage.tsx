import { rooms } from "../../assets/data/tabs";
import TabsComponent from "../../components/TabsComponent";
import TableComponent from '../../components/TableComponent';
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import OrderComponent from "../../components/OrderComponent";
import { roomsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { useEffect, useMemo, useState } from "react";
import { getAllRooms } from "../../features/rooms/roomsSlice";
import { deleteRoom, getRooms } from "../../features/rooms/roomsAsyncThunk";
import Loading from "../../components/Loading";
import { EditStyled } from "../../styled/IconStyled";
import { DeleteStyled } from './../../styled/IconStyled';
import styled from "styled-components";
import MySweetAlert from "../../app/MySweetAlert";
import { ORDER_ROOMS_INITIAL_STATE, TAB_ROOMS_INITIAL_STATE } from "../../helpers/constants";
import { ButtonStyledIcon, ButtonStyledNew, ButtonStyledViewNotes } from "../../styled/ButtonStyled";
import { ActionProps, DataProperties, DataTableProps, HandleClickDeleteProps, iRoom } from "../../entities/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DivStyledActions, DivStyledOptions, SectionContent } from "../../styled/DivStyled";


const ImgStyled = styled.img`
    width: 200px;
    height: 100px;
`;

const handleClickDelete = async ({ event, dispatch, id }: HandleClickDeleteProps) => {
    event.stopPropagation();
    try {
        await dispatch(deleteRoom(id)).unwrap()
        const html = <p>Delete #{id} Room Successfully</p>
        MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
    } catch (error) {
        console.log(error)
    }
}

const action = ({ id, dispatch }: ActionProps) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled></EditStyled></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete({ event, dispatch, id })}><DeleteStyled></DeleteStyled></ButtonStyledIcon>
        </DivStyledActions>
    )


}

const dataTable = ({ dispatch }: DataTableProps): DataProperties[] => [
    {
        'label': 'Image',
        display: (row: iRoom) => <ImgStyled src={row.photo[0]} />
    },
    {
        'label': 'Number',
        'property': 'number'
    },
    {
        'label': 'ID',
        'property': 'id'
    },
    {
        'label': 'Room Type',
        'property': 'type'
    },
    {
        'label': 'Amenities',
        display: (row: iRoom) => row.amenities?.length > 0 ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                const title = 'Info Amenities';
                const html = (<ul>
                    {row.amenities?.map((amen, index) => {
                        return <li key={index}>
                            {amen}
                        </li>;
                    })}
                </ul>);
                MySweetAlert({ title, html, showConfirmButton: false })
            }}>View Amenities</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotes disabled>View Amenities</ButtonStyledViewNotes>
    },
    {
        'label': 'Price',
        display: (row: iRoom) => (<><SpanStyledTableFirst>{(row.price)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>/Night</SpanStyledTableSecond></>)
    },
    {
        'label': 'Offer Price',
        display: (row: iRoom) => (<><SpanStyledTableFirst>{(row.price - (row.price * row.discount / 100)).toFixed(2)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>/Night</SpanStyledTableSecond></>)
    },
    {
        'label': 'Status',
        display: (row: iRoom) => row.status === 'Available' ?
            <SpanStyled>Available</SpanStyled>
            :
            <SpanStyledCheckOut>Booked</SpanStyledCheckOut>
    },
    {
        'label': 'Actions',
        display: (row: iRoom) => action({ id: row._id || '', dispatch: dispatch })
    }
];

const RoomsPage = () => {
    const dispatch: ThunkDispatch<RootState, any, any> = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean>(TAB_ROOMS_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState<string>(ORDER_ROOMS_INITIAL_STATE);
    const data = useAppSelector(getAllRooms);

    const filteredRooms = useMemo(() => {
        if (!data) {
            return data;
        }
        const all = data.filter((item) => currentTab === TAB_ROOMS_INITIAL_STATE ? true : item.status === currentTab);

        return all.sort((a, b) => {
            const order = currentOrder.split(' ');
            const property = order[0] as keyof iRoom;
            const orderType = order[1];

            if ((a[property] || '') > (b[property] || '')) {
                if (orderType === 'asc') {
                    return 1;
                }
                return -1;
            } else if ((a[property] || '') < (b[property] || '')) {
                if (orderType === 'asc') {
                    return -1;
                }
                return 1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab]);

    const initialFetch = async () => {
        try {
            await dispatch(getRooms()).unwrap();
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
            <DivStyledOptions>
                <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                <OrderComponent setCurrentOrder={setCurrentOrder} data={roomsOrder} />
            </DivStyledOptions>
            <TabsComponent setCurrentTab={setCurrentTab} data={rooms} currentTab={currentTab}></TabsComponent>
            <TableComponent rows={filteredRooms} columns={dataTable({ dispatch })} path={'rooms'}></TableComponent>
        </SectionContent>
    );
}

export default RoomsPage;