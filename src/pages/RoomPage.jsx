import { useLocation, useParams } from "react-router-dom";
import FormComponent from '../components/Form/FormComponent';
import { getOneRoom } from '../features/rooms/roomsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../features/rooms/roomsAsyncThunk';
import Loading from "../components/Loading";

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
        'name': 'full_name'
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
    const loc = useLocation().pathname;
    const { id } = useParams();

    const onCreateRoom = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => {
            if (control.input === 'file') {
                return event.target[control.name].value;
            } else if (control.input === 'select multiple') {
                const selectedOptions = event.target[control.name].selectedOptions;
                const values = [];
                for (let i = 0; i < selectedOptions.length; i++) {
                    values.push(selectedOptions[i].value);
                }
                return values;
            }
            return event.target[control.name].value
        });
    }

    const result = useCallback(async () => {
        await dispatch(getRoom(parseInt(id))).unwrap();
        setShowSpinner(false);
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result])

    return (
        <section className="content">
            {showSpinner ? <Loading></Loading> :
                <FormComponent path={loc} data={room} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateRoom}></FormComponent>}
        </section>
    )
}

export default RoomPage;