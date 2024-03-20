import { rooms } from "../../assets/data/tabs";
import TabsComponent from "../../components/TabsComponent";
import TableComponent from '../../components/TableComponent';
import { SpanStyled, SpanStyledCheckOut, SpanStyledTableFirst, SpanStyledTableSecond } from "../../styled/SpanStyled";
import { ButtonStyledIcon, ButtonStyledNew, ButtonStyledViewNotes } from "../../styled/ButtonsStyled";
import OrderComponent from "../../components/OrderComponent";
import { roomsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllRooms } from "../../features/rooms/roomsSlice";
import { deleteRoom, getRooms } from "../../features/rooms/roomsAsyncThunk";
import Loading from "../../components/Loading";
import { EditStyled } from "../../styled/IconStyled";
import { DeleteStyled } from './../../styled/IconStyled';
import { DivStyledActions } from "../../styled/DivsStyled";
import styled from "styled-components";
import MySwal from "../../app/MySwal";
import { ORDER_ROOMS_INITIAL_STATE, TAB_ROOMS_INITIAL_STATE } from "../../helpers/varHelpers";


const ImgStyled = styled.img`
    width: 200px;
    height: 100px;
`;

const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteRoom(id)).unwrap()
        const html = <p>Delete #{id} Room Successfully</p>
        MySwal('', html, false, 2000, 'success', true);
    } catch (error) {
        console.log(error)
    }
}

const action = (id, dispatch) => {
    return (
        <DivStyledActions>
            <ButtonStyledIcon as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}><EditStyled></EditStyled></ButtonStyledIcon>
            <ButtonStyledIcon onClick={(event) => handleClickDelete(event, dispatch, id)}><DeleteStyled></DeleteStyled></ButtonStyledIcon>
        </DivStyledActions>
    )


}

const dataTable = (dispatch) => [
    {
        'label': 'Image',
        display: row => <ImgStyled src={row.foto} />
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
        display: row => row.amenities.length > 0 ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                const title = 'Info Amenities';
                const html = (<ul>
                    {row.amenities.map((amen, index) => {
                        return <li key={index}>
                            {amen}
                        </li>;
                    })}
                </ul>);
                MySwal(title, html, false)
            }}>View Amenities</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotes disabled>View Amenities</ButtonStyledViewNotes>
    },
    {
        'label': 'Price',
        display: row => (<><SpanStyledTableFirst>{(row.price)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>/Night</SpanStyledTableSecond></>)
    },
    {
        'label': 'Offer Price',
        display: row => (<><SpanStyledTableFirst>{(row.price - (row.price * row.discount / 100)).toFixed(2)}</SpanStyledTableFirst><br /><SpanStyledTableSecond>/Night</SpanStyledTableSecond></>)
    },
    {
        'label': 'Status',
        display: row => row.status === 'Available' ?
            <SpanStyled>Available</SpanStyled>
            :
            <SpanStyledCheckOut>Booked</SpanStyledCheckOut>
    },
    {
        'label': 'Actions',
        display: row => action(row.id, dispatch)
    }
];

const RoomsPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(TAB_ROOMS_INITIAL_STATE);
    const [currentOrder, setCurrentOrder] = useState(ORDER_ROOMS_INITIAL_STATE);
    const data = useSelector(getAllRooms);

    const filteredRooms = useMemo(() => {
        const all = data.filter((item) => currentTab === TAB_ROOMS_INITIAL_STATE ? true : item.status === currentTab);

        return all.sort((a, b) => {
            const order = currentOrder.split(' ');
            if (a[order[0]] > b[order[0]]) {
                if (order[1] === 'asc') {
                    return 1;
                }
                return -1;
            } else if (a[order[0]] < b[order[0]]) {
                if (order[1] === 'asc') {
                    return -1;
                }
                return 1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab]);

    const inititalFecth = async () => {
        try {
            await dispatch(getRooms()).unwrap();
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
                <div className="top__menu-table">
                    <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                    <OrderComponent setCurrentOrder={setCurrentOrder} data={roomsOrder} />
                </div>
                <TabsComponent setCurrentTab={setCurrentTab} data={rooms} currentTab={currentTab}></TabsComponent>
                <TableComponent rows={filteredRooms} columns={dataTable(dispatch)} path={'rooms'}></TableComponent>
            </>
        </section>
    );
}

export default RoomsPage;