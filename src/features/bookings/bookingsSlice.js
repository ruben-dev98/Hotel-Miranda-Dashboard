import { createSlice } from "@reduxjs/toolkit"



const bookings = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: {

    }
});

export const { bookingsReducer } = bookings.reducer;