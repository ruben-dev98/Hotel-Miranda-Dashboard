import { rooms } from "../../assets/data/tabs";
import TableComponent from '../../components/TableComponent';
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import { roomsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { useEffect, useMemo, useState } from "react";
import { getAllRooms } from "../../features/rooms/roomsSlice";
import { deleteRoom, getRooms } from "../../features/rooms/roomsAsyncThunk";
import Loading from "../../components/Loading";
import { EditStyled, ImgRoomPhotoStyled } from "../../styled/IconStyled";
import { DeleteStyled } from './../../styled/IconStyled';
import MySweetAlert from "../../app/MySweetAlert";
import { ORDER_ROOMS_INITIAL_STATE, TAB_ROOMS_INITIAL_STATE, errorExistBooking } from "../../helpers/constants";
import { ButtonStyledIcon, ButtonStyledViewNotes } from "../../styled/ButtonStyled";
import { ActionProps, DataProperties, DataTableProps, HandleClickProps, iRoom } from "../../entities/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DivStyledActions, SectionContent } from "../../styled/DivStyled";
import TableOptions from "../../components/TableOptions";
import MySweetAlertApi from "../../app/MySweetAlertApi";
import { isExistBooking } from "../../helpers/existBooking";

const handleClickDelete = async ({ event, dispatch, id }: HandleClickProps) => {
    event.stopPropagation();
    try {
        const existBooking = await isExistBooking(id);
        if (existBooking) {
            MySweetAlertApi({ title: errorExistBooking, icon: 'error' });
            throw new Error(errorExistBooking);
        }
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
        display: (row: iRoom) => <ImgRoomPhotoStyled src={row.photo[0]} />
    },
    {
        'label': 'Information',
        display: (row: iRoom) => (
            <>
                <SpanStyledTableFirst>{row.type} - {row.number}</SpanStyledTableFirst><br />
                <SpanStyledTableSecond>#{row._id}</SpanStyledTableSecond>
            </>
        )
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
    const [currentTab, setCurrentTab] = useState<string>(TAB_ROOMS_INITIAL_STATE);
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
            <TableOptions
                currentTab={currentTab}
                data={rooms}
                dataOrder={roomsOrder}
                setCurrentOrder={setCurrentOrder}
                setCurrentTab={setCurrentTab}
                path="room" />
            <TableComponent currentTab={currentTab} rows={filteredRooms} columns={dataTable({ dispatch })} path={'rooms'}></TableComponent>
        </SectionContent>
    );
}

export default RoomsPage;