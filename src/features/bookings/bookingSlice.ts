import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addBooking, deleteBooking, editBooking, getBooking, getBookings } from "./bookingsAsyncThunk";
import { iBooking } from "../../entitys/Data";
import { RootState } from '../../app/store';



interface BookingSliceState {
    data: iBooking[],
    booking: iBooking,
    status: string,
    error: string | null
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        booking: {} as iBooking,
        status: 'idle',
        error: null
    } as BookingSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBookings.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(addBooking.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(editBooking.fulfilled, (state, action) => {
            state.data = state.data.map((booking) => booking.id === action.payload.id ? action.payload.data : booking);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.data = state.data.filter((booking) => booking.id !== action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addMatcher(isAnyOf (
            getBookings.pending,
            getBooking.pending,
            addBooking.pending,
            editBooking.pending,
            deleteBooking.pending 
            ), (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addMatcher(isAnyOf(
            getBookings.rejected,
            getBooking.rejected,
            addBooking.rejected,
            editBooking.rejected,
            deleteBooking.rejected 
            ), (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
    }
});

export const getAllBookings = (state: RootState) => state.bookings.data;
export const bookingsStatus = (state: RootState) => state.bookings.status;
export const getOneBooking = (state: RootState) => state.bookings.booking;

export default bookingsSlice.reducer;