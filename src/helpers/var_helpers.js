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

/*export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        rooms: roomsReducer,
        users: usersReducer,
        contacts: contactReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})*/