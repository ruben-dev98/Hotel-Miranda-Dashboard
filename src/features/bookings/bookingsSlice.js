import { createSlice } from "@reduxjs/toolkit"



export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
});

export default bookingsSlice.reducer;