import { rooms } from "../../assets/data/tabs";
import TabsComponent from "../../components/TabsComponent";
import TableComponent from '../../components/TableComponent';
import { SpanStyled, SpanStyledCheckOut } from "../../styled/SpanStyled";
import { ButtonStyledNew, ButtonStyledViewNotes } from "../../styled/ButtonsStyled";
import OrderComponent from "../../components/OrderComponent";
import { roomsOrder } from "../../assets/data/order";
import { LinkStyled } from "../../styled/LinkStyled";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllRooms } from "../../features/rooms/roomsSlice";
import { deleteRoom, getRooms } from "../../features/rooms/roomsAsyncThunk";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const handleClickDelete = async (event, dispatch, id) => {
    event.stopPropagation();
    try {
        await dispatch(deleteRoom(id)).unwrap()
        Swal.fire({'title': 'Eliminación de Room',
        'timer': 2000
        });
    } catch(error) {
        console.log(error)
    }
}

const action = (id, dispatch) => {
    return (<>
        <ButtonStyledViewNotes as={LinkStyled} to={`edit/${id}`} onClick={(event) => event.stopPropagation()}>Edit</ButtonStyledViewNotes>
        <ButtonStyledViewNotes onClick={(event) => handleClickDelete(event, dispatch, id)}>Delete</ButtonStyledViewNotes>
    </>)
    
    
}

const dataTable = (dispatch) => [
    {
        'label': 'Image',
        display: row => <img src={row.foto} style={{ width: 200, height: 100 }} />
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
        'property': 'amenities'
    },
    {
        'label': 'Price',
        'property': 'price'
    },
    {
        'label': 'Offer Price',
        display: row => (row.price - (row.price * row.discount / 100)).toFixed(2)
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
    const [showSpinner, setShowSpinner] = useState(true);
    const [currentTab, setCurrentTab] = useState('All Rooms');
    const [currentOrder, setCurrentOrder] = useState('number asc');
    const data = useSelector(getAllRooms);

    const filteredRooms = useMemo(() => {
        const all = currentTab === 'All Rooms' 
        ? data
        : data.filter((item) => item.status === currentTab);

        return [...all].sort((a, b) => {
            const order = currentOrder.split(' ');
            if(a[order[0]] > b[order[0]]) {
                if(order[1] === 'asc') {
                    return 1;
                }
                return -1;
            } else if(a[order[0]] < b[order[0]]) {
                if(order[1] === 'asc') {
                    return -1;
                }
                return 1;
            } else {
                return 0;
            }
        })
    }, [data, currentOrder, currentTab]);

    const result = useCallback(async () => {
        try {
            await dispatch(getRooms()).unwrap();
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
                    <div className="top__menu-table">
                        <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                        <OrderComponent setCurrentOrder={setCurrentOrder} data={roomsOrder} />
                    </div>
                    <TabsComponent setCurrentTab={setCurrentTab} data={rooms}></TabsComponent>
                    <TableComponent rows={filteredRooms} columns={dataTable(dispatch)} path={'rooms'}></TableComponent>
                </>
            }
        </section>
    );
}

export default RoomsPage;