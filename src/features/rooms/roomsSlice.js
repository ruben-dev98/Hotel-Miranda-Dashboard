import { createSlice } from "@reduxjs/toolkit"



export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
});

export default roomsSlice.reducer;