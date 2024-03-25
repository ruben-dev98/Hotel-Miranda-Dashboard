import { FakesUri } from "../entitys/Data";

export const TAB_BOOKING_INITIAL_STATE: string = 'All Bookings';
export const TAB_ROOMS_INITIAL_STATE: string = 'All Rooms';
export const TAB_MESSAGE_INITIAL_STATE: string = 'All Contacts';
export const TAB_EMPLOYEE_INITIAL_STATE: string = 'All Employees';

export const ORDER_BOOKING_INITIAL_STATE: string = 'order_date';
export const ORDER_ROOMS_INITIAL_STATE: string = 'number asc';
export const ORDER_EMPLOYEE_INITIAL_STATE: string = 'start_date';

export const ITEMS_PER_PAGE: number = 10;
export const HALF_WAY_ITEMS_PER_PAGE: number = ITEMS_PER_PAGE/2;
export const INITIAL_PAGE: number = 1;
export const NUMBER_ONE: number = 1;

export const URI_ROOM: FakesUri = {
    getAll: 'get/rooms',
    getOne: 'get/room',
    edit: 'edit/room',
    add: 'add/room',
    getRoomsNumber: 'get/allNumberRoom',
    delete: 'delete/room'
};
export const URI_MESSAGE: FakesUri = {
    getAll: 'get/messages',
    getOne: 'get/message',
    edit: 'edit/message',
    delete: 'delete/message'
};
export const URI_EMPLOYEE: FakesUri = {
    getAll: 'get/employees',
    getOne: 'get/employee',
    add: 'add/employee',
    edit: 'edit/employee',
    delete: 'delete/employee'
};
export const URI_BOOKINGS: FakesUri = {
    getAll: 'get/bookings',
    getOne: 'get/booking',
    add: 'add/booking',
    edit: 'edit/booking',
    delete: 'delete/booking'
};