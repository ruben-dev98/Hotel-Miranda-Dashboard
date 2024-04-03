import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllRooms, getOneRoom } from '../../features/rooms/roomsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, editRoom, getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import { lastId } from "../../app/getItemsId";
import FormComponent from "../../components/Form/FormComponent";
import MySwal from "../../app/MySwal";

const formControl = [
    {
        'label': 'Foto',
        'input': 'text',
        'name': 'foto'
    },
    {
        'label': 'Room Type',
        'input': 'select',
        'data': ['Single Bed', 'Double Bed', 'Double Superior', 'Suite'],
        'name': 'type'
    },
    {
        'label': 'Room Number',
        'input': 'number',
        'name': 'number'
    },
    {
        'label': 'Description',
        'input': 'textarea',
        'name': 'description'
    },
    {
        'label': 'Price',
        'input': 'number',
        'name': 'price'
    },
    {
        'label': 'Discount',
        'input': 'number',
        'name': 'discount'
    },
    {
        'label': 'Cancellation',
        'input': 'textarea',
        'name': 'cancellation'
    },
    {
        'label': 'Amenities',
        'input': 'select multiple',
        'data': ["Breakfast", "Smart Security", "Strong Locker", "Shower",
            "24/7 Online Support", "Kitchen", "Cleaning", "Expert Team", "High speed WiFi",
            "Air conditioner", "Towels", "Grocery", "Single bed", "Shop near"],
        'name': 'amenities'
    },
]

const RoomFormPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useSelector(getOneRoom);
    const rooms = useSelector(getAllRooms);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateRoom = async (event) => {
        event.preventDefault();
        const newId = lastId(rooms);
        const room = {
            id: id || newId,
            foto: '',
            type: '',
            number: '',
            description: '',
            offer: false,
            price: 0,
            cancellation: true,
            amenities: [],
            discount: 0,
            status: ''
        };
        
        formControl.forEach((control) => {
            if (control.input === 'select multiple') {
                const selectedOptions = event.target[control.name].selectedOptions;
                const values = [];
                for (let i = 0; i < selectedOptions.length; i++) {
                    values.push(selectedOptions[i].value)
                }
                room[control.name] = values;
            } else {
                room[control.name] = event.target[control.name].value;
            }
        });
        
        if(room.discount > 0) {
            room.offer = true;
        }
        
        const html = id ? <p>Update #{room.id} Room Successfully</p> : <p>Create #{room.id} Room Successfully</p>;

        if(loc.includes('edit')) {
            try {
                navigate('/rooms');
                await dispatch(editRoom({id: id, data: room})).unwrap();
                MySwal('', html, false, 2000, 'success', true);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/rooms');
                dispatch(addRoom(room)).unwrap();
                MySwal('', html, false, 2000, 'success', true);
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    const initialFetch = async () => {
        try {
            await dispatch(getRoom(parseInt(id))).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [])

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <FormComponent path={loc} data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
        </section>
    )
}

export default RoomFormPage;