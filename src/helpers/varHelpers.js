export const TAB_BOOKING_INITIAL_STATE = 'All Bookings';
export const TAB_ROOMS_INITIAL_STATE = 'All Rooms';
export const TAB_MESSAGE_INITIAL_STATE = 'All Contacts';
export const TAB_EMPLOYEE_INITIAL_STATE = 'All Employee';

export const ORDER_BOOKING_INITIAL_STATE = 'order_date';
export const ORDER_ROOMS_INITIAL_STATE = 'number asc';
export const ORDER_EMPLOYEE_INITIAL_STATE = 'start_date';

export const ITEMS_PER_PAGE = 10;
export const HALF_WAY_ITEMS_PER_PAGE = ITEMS_PER_PAGE/2;
export const INITIAL_PAGE = 1;
export const NUMBER_ONE = 1;

export const URI_ROOM = {
    getAll: 'get/rooms',
    getOne: 'get/room',
    edit: 'edit/room',
    add: 'add/room',
    getRoomsNumber: 'get/allNumberRoom',
    delete: 'delete/room'
};
export const URI_MESSAGE = {
    getAll: 'get/messages',
    getOne: 'get/message',
    edit: 'edit/message',
    delete: 'delete/message'
};
export const URI_EMPLOYEE = {
    getAll: 'get/employees',
    getOne: 'get/employee',
    add: 'add/employee',
    edit: 'edit/employee',
    delete: 'delete/employee'
};

export const URI_BOOKINGS = {
    getAll: 'get/bookings',
    getOne: 'get/booking',
    add: 'add/booking',
    edit: 'edit/booking',
    delete: 'delete/booking'
};