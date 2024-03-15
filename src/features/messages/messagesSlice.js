import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { deleteMessage, editMessage, getMessage, getMessages } from "./messagesAsyncThunk";

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        message: {},
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getMessage.fulfilled, (state, action) => {
            state.message.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(editMessage.fulfilled, (state, action) => {
            const index = state.data.findIndex((message) => message.id === action.payload.id);
            state.data[index].archived = true;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            const index = state.data.findIndex((message) => message.id === action.payload);
            state.data.splice(index, 1);
            state.message.status = 'fulfilled';
            state.message.error = null;
        })
        .addMatcher(isAnyOf (
            getMessages.rejected,
            getMessage.rejected,
            editMessage.rejected,
            deleteMessage.rejected 
            ), (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        
    }
});

export const getAllMessages = state => state.messages.data;
export const messagesStatus = state => state.messages.status;
export const getOneMessage = state => state.messages.message;

export default messagesSlice.reducer;