import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormComponent from '../../components/Form/FormComponent';
import { useEffect, useState } from "react";
import { addBooking, editBooking, getBooking } from "../../features/bookings/bookingsAsyncThunk";
import { getOneBooking } from "../../features/bookings/bookingSlice";
import Loading from "../../components/Loading";
import { availableRooms } from "../../features/rooms/roomsSlice";
import { availableRoomsNumber } from "../../features/rooms/roomsAsyncThunk";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { FormControlPropsBooking, iBooking, iRoom } from "../../entities/Data";
import { SectionContent } from "../../styled/DivStyled";
import { existRoomNumber } from './../../helpers/existRoomNumber';
import MySweetAlertApi from "../../app/MySweetAlertApi";
import { roomNotExist } from "../../helpers/constants";

export interface FormDataBookings extends EventTarget {
    full_name: HTMLFormElement,
    check_in: HTMLFormElement,
    check_out: HTMLFormElement,
    number: HTMLFormElement,
    email: HTMLFormElement,
    phone: HTMLFormElement,
    discount: HTMLFormElement,
    special_request: HTMLFormElement
}

const formControl = (rooms: string[]): FormControlPropsBooking[] => [
    {
        'label': 'Full Name',
        'input': 'text',
        'name': 'full_name'
    },
    {
        'label': 'Check In',
        'input': 'date',
        'name': 'check_in'
    },
    {
        'label': 'Check Out',
        'input': 'date',
        'name': 'check_out'
    },
    {
        'label': 'Room Number',
        'input': 'select',
        'data': rooms,
        'name': 'number'
    },
    {
        'label': 'Email',
        'input': 'email',
        'name': 'email'
    },
    {
        'label': 'Discount',
        'input': 'number',
        'name': 'discount'
    },
    {
        'label': 'Phone',
        'input': 'text',
        'name': 'phone'
    },
    {
        'label': 'Special Request',
        'input': 'textarea',
        'name': 'special_request'
    }
]

const BookingFormPage = () => {
    const navigate = useNavigate();
    const loc = useLocation().pathname;
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const booking = useAppSelector(getOneBooking);
    const rooms = useAppSelector(availableRooms);

    const onCreateBooking = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bookingToCreate: iBooking = {
            full_name: '',
            order_date: Date.now().toString(),
            check_in: '',
            check_out: '',
            special_request: '',
            phone: '',
            email: '',
            status: 'In Progress',
            discount: 0,
            room: {} as iRoom
        }
        
        try {
            const element = event.target as FormDataBookings;
            const room = id ? booking.room : await existRoomNumber(element['number'].value);
            if (!room) {
                MySweetAlertApi({ title: roomNotExist, icon: 'error' });
                throw new Error(roomNotExist);
            }
            
            formControl(rooms).forEach((control) => {
                const property = control.name as keyof iBooking;
                if (control.input === 'date') {
                    (bookingToCreate[property] as string) = String(new Date(element[control.name].value).getTime());
                } else if (control.name === 'number') {
                    bookingToCreate['room'] = { ...room };
                } else {
                    (bookingToCreate[property] as string | number) = element[control.name].value;
                }
            });

            if (id) {
                await dispatch(editBooking({ id: id || '', data: bookingToCreate }));
            } else {
                await dispatch(addBooking(bookingToCreate));
            }

            navigate('/bookings');
        } catch (error) {
            console.error(error);
        }
    }

    const initialFetch = async () => {
        await dispatch(availableRoomsNumber()).unwrap();
        await dispatch(getBooking(id || '')).unwrap();
        setIsLoading(false);
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if (isLoading) {
        return (
            <SectionContent>
                <Loading></Loading>
            </SectionContent>
        )
    }

    return (
        <SectionContent>
            <FormComponent formControl={formControl(rooms)} data={booking} onHandleSubmit={onCreateBooking}></FormComponent>
        </SectionContent>
    );

}

export default BookingFormPage;