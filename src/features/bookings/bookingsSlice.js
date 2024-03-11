import { createSlice } from "@reduxjs/toolkit"
import { addBooking, deleteBooking, editBooking, getBooking, getBookings } from "./bookingsAsyncThunk";



export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        booking: {
            data: null,
            status: 'idle',
            error: null
        },
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getBookings.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addCase(getBookings.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getBookings.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(getBooking.pending, (state, action) => {
            state.booking.status = 'pending';
            state.booking.error = null;
        })
        .addCase(getBooking.fulfilled, (state, action) => {
            state.booking.data = action.payload;
            state.booking.status = 'fulfilled';
            state.booking.error = null;
        })
        .addCase(getBooking.rejected, (state, action) => {
            state.booking.status = 'rejected';
            state.booking.error = action.error.message;
        })
        .addCase(addBooking.pending, (state, action) => {
            state.booking.status = 'pending';
            state.booking.error = null;
        })
        .addCase(addBooking.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.booking.status = 'fulfilled';
            state.booking.error = null;
        })
        .addCase(addBooking.rejected, (state, action) => {
            state.booking.status = 'rejected';
            state.booking.error = action.error.message;
        })
        .addCase(editBooking.pending, (state, action) => {
            state.booking.status = 'pending';
            state.booking.error = null;
        })
        .addCase(editBooking.fulfilled, (state, action) => {
            state.data.slice(state.data.findIndex(element => element.id === action.payload.id), 1, action.payload);
            state.booking.status = 'fulfilled';
            state.booking.error = null;
        })
        .addCase(editBooking.rejected, (state, action) => {
            state.booking.status = 'rejected';
            state.booking.error = action.error.message;
        })
        .addCase(deleteBooking.pending, (state, action) => {
            state.booking.status = 'pending';
            state.booking.error = null;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.data.slice(state.data.findIndex(element => element.id === action.payload.id), 1);
            state.booking.status = 'fulfilled';
            state.booking.error = null;
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            state.booking.status = 'rejected';
            state.booking.error = action.error.message;
        })
    }
});

export const getAllBookings = state => state.bookings.data;
export const bookingsStatus = state => state.bookings.status;
export const getOneBooking = state => state.bookings.booking.data;
export const bookingStatus = state => state.bookings.booking.status;

export default bookingsSlice.reducer;