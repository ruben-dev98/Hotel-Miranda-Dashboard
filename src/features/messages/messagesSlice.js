import { createSlice } from "@reduxjs/toolkit"



const messages = createSlice({
    name: 'messages',
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

export const { messageReducer } = messages.reducer;