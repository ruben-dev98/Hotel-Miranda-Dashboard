import { useParams } from "react-router-dom";
import { getOneRoom } from '../../features/rooms/roomsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";

const object__fields = [
    {
        'field': 'id',
        'type': 'text'
    },
    {
        'field': 'number',
        'type': 'text'
    },
    {
        display: field => field.offer === true ? field.price - (field.price * field.discount / 100) : field.price,
        'type': 'text'
    },
    {
        'field': 'foto',
        'type': 'swiper'
    },
    {
        'field': 'description',
        'type': 'text'
    },
    {
        'field': 'type',
        'type': 'text'
    },
    {
        'field': 'amenities',
        'type': 'array'
    },
    {
        'field': 'status',
        'type': 'text'
    }
];


const RoomPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const room = useSelector(getOneRoom);
    const { id } = useParams();

    const result = useCallback(async () => {
        try {
            await dispatch(getRoom(parseInt(id))).unwrap();
            setShowSpinner(false);
        } catch (error) {
            console.log(error);
        }
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result])

    return (
        <section className="content">
            {showSpinner ? <Loading></Loading> :
                <DetailsComponent data={room} object__fields={object__fields}></DetailsComponent>
            }
        </section>
    )
}

export default RoomPage;