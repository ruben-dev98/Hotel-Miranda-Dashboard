import { ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface iBooking {
    _id?: string, 
    full_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    status: string,
    discount: number,
    phone: string,
    email: string,
    room: iRoom
}

export interface iEmployee {
    _id?: string, 
    photo: string,
    full_name: string,
    email: string,
    start_date: string,
    description: string,
    job: string,
    contact: string,
    status: boolean,
    password: string
}

export interface iMessage {
    _id?: string, 
    full_name: string,
    email: string,
    phone: string,
    subject: string,
    messages: string,
    date: string,
    read: boolean,
    archived: boolean,
    photo: string,
    time_passed: string
}

export interface iRoom {
    _id?: string, 
    photo: Array<string>,
    type: string,
    number: number,
    description: string,
    offer: boolean,
    price: number,
    cancellation: string,
    amenities: Array<string>,
    discount: number,
    status: string
}

export interface FakesUri {
    getAll: number,
    getOne: number,
    edit: number,
    add?: number,
    getRoomsNumber?: number,
    delete: number
}

export interface EditDataThunk {
    id: string,
    data: iEmployee | iRoom | iMessage | iBooking
}

export interface ObjectFields {
    type: string,
    display: (field: iBooking | iEmployee | iRoom) => JSX.Element
}

export interface HandleClickDeleteProps {
    event: React.MouseEvent<HTMLButtonElement>,
    dispatch: ThunkDispatch<RootState, any, any>,
    id: string
}

export interface ActionProps {
    id: string,
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
    name: 'photo' | 'type' | 'number' | 'description' | 'price' | 'discount' | 'cancellation' | 'amenities'
}

export interface FormControlPropsEmployee extends FormControlProps {
    name: 'photo' | 'full_name' | 'job' | 'email' | 'contact' | 'start_date' | 'description' | 'status' | 'password'
}

export interface FormControlPropsBooking extends FormControlProps {
    name: 'full_name' | 'check_in' | 'check_out' | 'number' | 'email' | 'phone' | 'special_request'
}