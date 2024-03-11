import { configureStore } from "@reduxjs/toolkit";
import { bookingsReducer } from "../features/bookings/bookingsSlice";
import { employeesReducer } from "../features/employees/employeesSlice";
import { messageReducer } from "../features/messages/messagesSlice";
import { roomsReducer } from "../features/rooms/roomsSlice";


const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        employees: employeesReducer,
        messages: messageReducer,
        rooms: roomsReducer,
    }
});


export default store;