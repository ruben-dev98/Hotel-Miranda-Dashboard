import { createSlice } from "@reduxjs/toolkit"
import { getBookings } from "./bookingsAsyncThunk";



export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        booking: {},
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getBookings.pending, (state, action) => {
            state.status = 'pending';
            state.erro = null;
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
    }
});

export const getAllBookings = state => state.bookings.data;
export const bookingsStatus = state => state.bookings.status;

export default bookingsSlice.reducer;