import { FormControlPropsBooking, FormControlPropsEmployee, FormControlPropsRoom, iBooking, iEmployee, iRoom } from "../entities/Data";
import { FormDataBookings } from "../pages/Booking/BookingFormPage";
import { FormDataRooms } from "../pages/Room/RoomFormPage";
import { FormDataUser } from "../pages/User/UserFormPage";

type data = iBooking | iEmployee | iRoom;
type FormData = FormDataUser & FormDataBookings & FormDataRooms;
type Control = FormControlPropsBooking[] | FormControlPropsEmployee[] | FormControlPropsRoom[];

interface FormControlProps {
    controlProps: Control,
    target: EventTarget
}

export const formControl = ({controlProps, target}: FormControlProps) => {
    let data: data = {} as data; 
    const element = target as FormData;
    controlProps.forEach((control) => {
        const property = control.name;
        const indexObject = control.name as keyof data;
        switch(control.input) {
            case 'select multiple':
                const selectedOptions = element[property].selectedOptions;
                const values: Array<string> = [];
                for (let i = 0; i < selectedOptions.length; i++) {
                    values.push(selectedOptions[i].value)
                }
                //data[indexObject] = values;
                break;
            case 'date':
                data[indexObject] = String(new Date(element[property].value).getTime());
                break;
            default:
                data[indexObject] = element[property].value;
                break;
        }
    });

    return data;
}