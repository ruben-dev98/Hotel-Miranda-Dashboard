import { createSlice } from "@reduxjs/toolkit"
import { getMessages } from "./messagesAsyncThunk";



export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        message: {},
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.status = 'pending';
            state.erro = null;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    }
});

export const getAllMessages = state => state.messages.data;
export const messagesStatus = state => state.messages.status;

export default messagesSlice.reducer;