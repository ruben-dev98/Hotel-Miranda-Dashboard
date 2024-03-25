import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from '../features/bookings/bookingSlice';
import employeesReducer from "../features/employees/employeesSlice";
import messageReducer from "../features/messages/messagesSlice";
import roomsReducer from "../features/rooms/roomsSlice";


export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        employees: employeesReducer,
        messages: messageReducer,
        rooms: roomsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch