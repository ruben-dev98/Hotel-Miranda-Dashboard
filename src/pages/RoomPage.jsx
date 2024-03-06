import dataRoom from '../assets/data/rooms.json';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormComponent from '../components/Form/FormComponent';

const formControl = [
    {
        'label': 'Foto',
        'input': 'file',
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
        'label': 'Offer',
        'input': 'select',
        'data': ['Yes', 'No'],
        'name': 'offer'
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
        'data': ["Breakfast", "Smart Security", "Strong Locker","Shower",
        "24/7 Online Support", "Kitchen", "Cleaning", "Expert Team", "High speed WiFi",
        "Air conditioner", "Towels", "Grocery", "Single bed", "Shop near"],
        'name': 'amenities'
    },
]

const object__fields = ['id', 'foto','full_name', 'start_date', 'description', 'contact', 'status'];


const RoomPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    const onCreateRoom = (event) => {
        event.preventDefault();
        const results = formControl.map((control) => {
            if(control.input === 'file') {
                return event.target[control.name].value;
            } else if(control.input === 'select multiple') {
                const selectedOptions = event.target[control.name].selectedOptions;
                const values = [];
                for (let i = 0; i < selectedOptions.length; i++) {
                    values.push(selectedOptions[i].value);
                }
                return values;
            }
            return event.target[control.name].value
        });
        console.log(results);
    }

    useEffect(() => {
        setRoom(dataRoom.find((room) => room.id === parseInt(id)));
    }, [id]);


    return (
        <section className="content">
            <FormComponent data={room} formControl={formControl} object__fields={object__fields} onHandleSubmit={onCreateRoom}></FormComponent>
        </section>
    )
}

export default RoomPage;