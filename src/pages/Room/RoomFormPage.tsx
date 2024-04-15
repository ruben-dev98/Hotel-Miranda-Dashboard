import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOneRoom } from '../../features/rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { addRoom, editRoom, getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import FormComponent from "../../components/Form/FormComponent";
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
            cancellation: '',
            amenities: [],
            discount: 0,
            status: 'Available'
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
        try {
            if (loc.includes('edit')) {
                await dispatch(editRoom({ id: id || '', data: room }));
            } else {
                await dispatch(addRoom(room));
            }
            navigate('/rooms');
        } catch (error) {
            console.error(error);
        }
    }

    const initialFetch = async () => {
        await dispatch(getRoom(id || '')).unwrap();
        setIsLoading(false);
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
            <FormComponent data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
        </section>
    )
}

export default RoomFormPage;