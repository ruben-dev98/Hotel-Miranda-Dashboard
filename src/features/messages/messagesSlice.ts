import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { deleteMessage, editMessage, getMessage, getMessages } from "./messagesAsyncThunk";
import { iMessage } from "../../entities/Data";
import { RootState } from "../../app/store";

interface MessageSliceState {
    data: iMessage[],
    message: iMessage,
    status: string,
    error: string | null
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        message: {} as iMessage,
        status: 'idle',
        error: null
    } as MessageSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getMessage.fulfilled, (state, action) => {
            state.message = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(editMessage.fulfilled, (state, action) => {
            const index = state.data.findIndex((message) => message._id === action.payload._id);
            state.data[index].archived = true;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.data = state.data.filter((message) => message._id !== action.payload._id);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addMatcher(isAnyOf (
            getMessages.rejected,
            getMessage.rejected,
            editMessage.rejected,
            deleteMessage.rejected 
            ), (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        
    }
});

export const getAllMessages = (state: RootState) => state.messages.data;
export const messagesStatus = (state: RootState) => state.messages.status;
export const getOneMessage = (state: RootState) => state.messages.message;

export default messagesSlice.reducer;