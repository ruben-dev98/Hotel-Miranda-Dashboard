import { createSlice } from "@reduxjs/toolkit"
import { deleteMessage, editMessage, getMessage, getMessages } from "./messagesAsyncThunk";

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        message: {
            data: null,
            status: 'idle',
            error: null
        },
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
        .addCase(getMessage.pending, (state, action) => {
            state.message.status = 'pending';
            state.message.error = null;
        })
        .addCase(getMessage.fulfilled, (state, action) => {
            state.message.data = action.payload;
            state.message.status = 'fulfilled';
            state.message.error = null;
        })
        .addCase(getMessage.rejected, (state, action) => {
            state.message.status = 'rejected';
            state.message.error = action.error.message;
        })
        .addCase(editMessage.pending, (state, action) => {
            state.message.status = 'pending';
            state.message.error = null;
        })
        .addCase(editMessage.fulfilled, (state, action) => {
            const index = state.data.findIndex((message) => message.id === action.payload.id);
            state.data[index].archived = true;
            state.message.status = 'fulfilled';
            state.message.error = null;
        })
        .addCase(editMessage.rejected, (state, action) => {
            state.message.status = 'rejected';
            state.message.error = action.error.message;
        })
        .addCase(deleteMessage.pending, (state, action) => {
            state.message.status = 'pending';
            state.message.error = null;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.data = state.data.filter((message) => message.id !== action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addMatcher(isAnyOf (
            getMessages.pending,
            getMessage.pending,
            editMessage.pending,
            deleteMessage.pending 
            ), (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addCase(deleteMessage.rejected, (state, action) => {
            state.message.status = 'rejected';
            state.message.error = action.error.message;
        })
    }
});

export const getAllMessages = state => state.messages.data;
export const messagesStatus = state => state.messages.status;
export const getOneMessage = state => state.messages.message.data;

export default messagesSlice.reducer;