import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllRooms, getOneRoom } from '../../features/rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { addRoom, editRoom, getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import FormComponent from "../../components/Form/FormComponent";
import MySweetAlert from "../../app/MySweetAlert";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { FormControlPropsRoom, iRoom } from "../../entities/Data";



interface FormData extends EventTarget {
    photo: HTMLFormElement,
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
        'name': 'photo'
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
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useAppSelector(getOneRoom);
    const rooms = useAppSelector(getAllRooms);
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const room: iRoom = {
            photo: [],
            type: '',
            number: 0,
            description: '',
            offer: false,
            price: 0,
            cancellation: 'Lorem Ipsum',
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

        const html = id ? <p>Update #{room._id} Room Successfully</p> : <p>Create #{room._id} Room Successfully</p>;

        if (loc.includes('edit')) {
            try {
                navigate('/rooms');
                await dispatch(editRoom({ id: id || '', data: room })).unwrap();
                MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                navigate('/rooms');
                dispatch(addRoom(room)).unwrap();
                MySweetAlert({ title: '', html, showConfirmButton: false, timer: 2000, icon: 'success', timerProgressBar: true });
            } catch (error) {
                console.log(error);
            }

        }
    }

    const initialFetch = async () => {
        try {
            await dispatch(getRoom(id || '')).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    useEffect(() => {
        initialFetch();
    }, [])

    return (
        <section className="content">
            <FormComponent data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
        </section>
    )
}

export default RoomFormPage;