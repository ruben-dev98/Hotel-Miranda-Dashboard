export interface iBooking {
    id: number,
    full_name: string,
    order_date: number,
    check_in: number,
    check_out: number,
    special_request: string,
    number: number,
    price: number,
    type: string,
    status: 'Check In' | 'Check Out' | 'In Progress',
    amenities: Array<string>,
    room_status: 'Booked' | 'Available',
    foto: string,
    description: string,
    phone: number,
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
    contact: number,
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
    date: number,
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
    status: 'Available' | 'Booked'
}

export interface FakesUri {
    getAll: string,
    getOne: string,
    edit: string,
    add?: string,
    getRoomsNumber?: string,
    delete: string
}