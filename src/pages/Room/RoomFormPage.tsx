import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllRooms, getOneRoom } from '../../features/rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { addRoom, editRoom, getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import { lastId } from "../../app/getItenId";
import FormComponent from "../../components/Form/FormComponent";
import MySwal from "../../app/MySwal";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { FormControlPropsRoom, iRoom } from "../../entitys/Data";



interface FormData extends EventTarget {
    foto: HTMLFormElement,
    type: HTMLFormElement,
    number: HTMLFormElement,
    description: HTMLFormElement,
    price: HTMLFormElement,
    discount: HTMLFormElement,
    cancellation: HTMLFormElement,
    amenities: HTMLFormElement
}

const formControl: FormControlPropsRoom[] = [
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
<<<<<<< HEAD:src/pages/Room/RoomFormPage.jsx
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useSelector(getOneRoom);
    const rooms = useSelector(getAllRooms);
=======
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useAppSelector(getOneRoom);
    const rooms = useAppSelector(getAllRooms);
>>>>>>> typescript:src/pages/Room/RoomFormPage.tsx
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newId = lastId(rooms);
        const room: iRoom = {
            id: parseInt(id || '') || newId,
            foto: '',
            type: '',
            number: 0,
            description: '',
            offer: false,
            price: 0,
            cancellation: true,
            amenities: [],
            discount: 0,
            status: ''
        };

        formControl.forEach((control) => {
            const element = event.target as FormData;
            const property = control.name as keyof iRoom;
            if (control.input === 'select multiple') {
                const selectedOptions = element[control.name].selectedOptions;
                const values: string[] = [];
                for (let i = 0; i < selectedOptions.length; i++) {
                    values.push(selectedOptions[i].value)
                }
                (room[property] as string[]) = values;
            } else {
                (room[property] as string | number) = element[control.name].value;
            }
        });

        if (room.discount > 0) {
            room.offer = true;
        }

        const html = id ? <p>Update #{room.id} Room Successfully</p> : <p>Create #{room.id} Room Successfully</p>;

        if (loc.includes('edit')) {
            try {
                navigate('/rooms');
                await dispatch(editRoom({ id: parseInt(id || ''), data: room })).unwrap();
                MySwal({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/rooms');
                dispatch(addRoom(room)).unwrap();
                MySwal({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }

        }
    }

<<<<<<< HEAD:src/pages/Room/RoomFormPage.jsx
    const initialFetch = async () => {
        try {
            await dispatch(getRoom(parseInt(id))).unwrap();
=======
    const initialFetch =async () => {
        try {
            await dispatch(getRoom(parseInt(id || ''))).unwrap();
>>>>>>> typescript:src/pages/Room/RoomFormPage.tsx
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
<<<<<<< HEAD:src/pages/Room/RoomFormPage.jsx
=======

    if(isLoading) {
        return <Loading/>;
    }
>>>>>>> typescript:src/pages/Room/RoomFormPage.tsx

    useEffect(() => {
        initialFetch();
    }, [])
<<<<<<< HEAD:src/pages/Room/RoomFormPage.jsx

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <FormComponent path={loc} data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
=======

    return (
        <section className="content">
            <FormComponent data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
>>>>>>> typescript:src/pages/Room/RoomFormPage.tsx
        </section>
    )
}

export default RoomFormPage;