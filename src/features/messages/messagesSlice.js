import { createSlice } from "@reduxjs/toolkit"



export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
});

export default messagesSlice.reducer;