import { createSlice } from "@reduxjs/toolkit"



const rooms = createSlice({
    name: 'rooms',
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

export const { roomsReducer } = rooms.reducer;