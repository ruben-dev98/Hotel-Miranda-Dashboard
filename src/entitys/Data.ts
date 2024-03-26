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
    status: boolean,
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

export interface ArrayIData {
    data: Array<iBooking | iRoom | iMessage | iEmployee> | null
}

export interface ArrayIRooms extends ArrayIData {
    rooms: Array<iRoom> | null;
}

export interface iData {
    data: iBooking | iRoom | iMessage | iEmployee | null
}

export interface EditDataThunk {
    id: number,
    data: iEmployee | iBooking | iMessage | iBooking
}

export interface ObjectFields {
    type: string;
}

export interface ObjectFieldsBooking extends ObjectFields {
    display: (field: iBooking) => JSX.Element;
}

export interface ObjectFieldsEmployee extends ObjectFields {
    display: (field: iEmployee) => JSX.Element;
}

export interface ObjectFieldsRoom extends ObjectFields {
    display: (field: iRoom) => JSX.Element;
}