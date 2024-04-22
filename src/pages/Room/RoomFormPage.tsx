import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOneRoom } from '../../features/rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { addRoom, editRoom, getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import FormComponent from "../../components/Form/FormComponent";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { FormControlPropsRoom, iRoom } from "../../entities/Data";
import { SectionContent } from "../../styled/DivStyled";
import MySweetAlertApi from "../../app/MySweetAlertApi";
import { atLeastThreePhotos, notMoreThanFivePhotos, roomNumberAlreadyExist } from "../../helpers/constants";
import { existRoomNumber } from "../../helpers/existRoomNumber";



export interface FormDataRooms extends EventTarget {
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
        'label': 'Photo',
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

        try {
            const element = event.target as FormDataRooms;
            const existRoom = await existRoomNumber(element['number'].value);
            if(existRoom && !id) {
                MySweetAlertApi({ title: roomNumberAlreadyExist, icon: 'error' })
                throw new Error(roomNumberAlreadyExist);
            }
            
            formControl.forEach((control) => {
                const property = control.name as keyof iRoom;    
                if (control.input === 'select multiple') {
                    const selectedOptions = element[control.name].selectedOptions;
                    const values: string[] = [];
                    for (let i = 0; i < selectedOptions.length; i++) {
                        values.push(selectedOptions[i].value)
                    }
                    (room[property] as string[]) = values;
                } else if (control.name === 'photo') {
                    const values = element[control.name].value.split(',');
                    if (values.length < 3) {
                        MySweetAlertApi({ title: atLeastThreePhotos, icon: 'error' })
                        throw new Error(atLeastThreePhotos);
                    } else if (values.length > 5) {
                        MySweetAlertApi({ title: notMoreThanFivePhotos, icon: 'error' })
                        throw new Error(notMoreThanFivePhotos);
                    }
                    (room[property] as string[]) = values;
                } else {
                    (room[property] as string | number) = element[control.name].value;
                }
            });

            if (room.discount > 0) {
                room.offer = true;
            }

            if (id) {
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
        return (
            <SectionContent>
                <Loading></Loading>
            </SectionContent>
        );
    }

    return (
        <SectionContent>
            <FormComponent data={room} formControl={formControl} onHandleSubmit={onCreateRoom}></FormComponent>
        </SectionContent>
    )
}

export default RoomFormPage;