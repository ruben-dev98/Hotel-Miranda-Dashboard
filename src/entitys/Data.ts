import { ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface iBooking {
    id: number,
    full_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    number: number,
    price: number,
    type: string,
    status: string,
    amenities: Array<string>,
    room_status: string,
    foto: string,
    description: string,
    phone: string,
    email: string
}

export interface iEmployee {
    foto: string,
    full_name: string,
    id: number,
    email: string,
    start_date: string,
    description: string,
    job: string,
    contact: string,
    status: boolean | string,
    password: string
}

export interface iMessage {
    id: number,
    full_name: string,
    email: string,
    phone: string,
    subject: string,
    messages: string,
    date: string,
    read: boolean,
    archived: boolean,
    foto: string,
    time_passed: string
}

export interface iRoom {
    id: number,
    foto: string,
    type: string,
    number: number,
    description: string,
    offer: boolean,
    price: number,
    cancellation: boolean,
    amenities: Array<string>,
    discount: number,
    status: string
}

export interface FakesUri {
    getAll: string,
    getOne: string,
    edit: string,
    add?: string,
    getRoomsNumber?: string,
    delete: string
}

export interface EditDataThunk {
    id: number,
    data: iEmployee | iRoom | iMessage | iBooking
}

export interface ObjectFields {
    type: string,
    display: (field: iBooking | iEmployee | iRoom) => JSX.Element
}

export interface HandleClickDeleteProps {
    event: React.MouseEvent<HTMLButtonElement>,
    dispatch: ThunkDispatch<RootState, any, any>,
    id: number
}

export interface ActionProps {
    id: number,
    dispatch: ThunkDispatch<RootState, any, any>
}

export interface DataTableProps {
    dispatch: ThunkDispatch<RootState, any, any>
}

export interface DataProperties {
    label: string;
    property?: string;
    display?: Function;
}

interface FormControlProps {
    label: string,
    input: string,
    data?: string[]
    
}

export interface FormControlPropsRoom extends FormControlProps {
    name: 'foto' | 'type' | 'number' | 'description' | 'price' | 'discount' | 'cancellation' | 'amenities'
}

export interface FormControlPropsEmployee extends FormControlProps {
    name: 'foto' | 'full_name' | 'job' | 'email' | 'contact' | 'start_date' | 'description' | 'status' | 'password'
}

export interface FormControlPropsBooking extends FormControlProps {
    name: '' | '' | '' | '' | '' | '' | ''
}