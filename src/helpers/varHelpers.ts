import { FakesUri } from "../entities/Data";

export const TAB_BOOKING_INITIAL_STATE: string = 'All Bookings';
export const TAB_ROOMS_INITIAL_STATE: string = 'All Rooms';
export const TAB_MESSAGE_INITIAL_STATE: string = 'All Contacts';
export const TAB_EMPLOYEE_INITIAL_STATE: string = 'All Employees';

export const ORDER_BOOKING_INITIAL_STATE = 'order_date';
export const ORDER_ROOMS_INITIAL_STATE = 'number asc';
export const ORDER_EMPLOYEE_INITIAL_STATE = 'start_date';

export const ITEMS_PER_PAGE: number = 10;
export const HALF_WAY_ITEMS_PER_PAGE: number = ITEMS_PER_PAGE/2;
export const INITIAL_PAGE: number = 1;
export const NUMBER_ONE: number = 1;

export const URI_ROOM: FakesUri = {
    getAll: '/rooms',
    getOne: '/rooms/:id',
    edit: '/rooms/:id',
    add: '/rooms/:id',
    getRoomsNumber: 'get/allNumberRoom',
    delete: '/rooms/:id'
};
export const URI_MESSAGE: FakesUri = {
    getAll: '/messages/',
    getOne: '/messages/:id',
    edit: '/messages/:id',
    delete: '/messages/:id'
};
export const URI_EMPLOYEE: FakesUri = {
    getAll: '/employees/',
    getOne: '/employees/:id',
    edit: '/employees/:id',
    add: '/employees/:id',
    delete: '/employees/:id'
};
export const URI_BOOKINGS: FakesUri = {
    getAll: '/bookings/',
    getOne: '/bookings/:id',
    edit: '/bookings/:id',
    add: '/bookings/:id',
    delete: '/bookings/:id'
};

export const SERVER: string = 'http://localhost:3000';