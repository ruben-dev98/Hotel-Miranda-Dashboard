import { createSlice } from "@reduxjs/toolkit"
import { addRoom, deleteRoom, editRoom, getRoom, getRooms } from "./roomsAsyncThunk";



export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        room: {
            data: null,
            status: 'idle',
            error: null
        },
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getRooms.pending, (state, action) => {
            state.status = 'pending';
            state.erro = null;
        })
        .addCase(getRooms.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getRooms.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(getRoom.pending, (state, action) => {
            state.room.status = 'pending';
            state.room.error = null;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            state.room.data = action.payload;
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(getRoom.rejected, (state, action) => {
            state.room.status = 'rejected';
            state.room.error = action.error.message;
        })
        .addCase(addRoom.pending, (state, action) => {
            state.room.status = 'pending';
            state.room.error = null;
        })
        .addCase(addRoom.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(addRoom.rejected, (state, action) => {
            state.room.status = 'rejected';
            state.room.error = action.error.message;
        })
        .addCase(editRoom.pending, (state, action) => {
            state.room.status = 'pending';
            state.room.error = null;
        })
        .addCase(editRoom.fulfilled, (state, action) => {
            state.data.slice(state.data.findIndex(element => element.id === action.payload.id), 1, action.payload);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(editRoom.rejected, (state, action) => {
            state.room.status = 'rejected';
            state.room.error = action.error.message;
        })
        .addCase(deleteRoom.pending, (state, action) => {
            state.room.status = 'pending';
            state.room.error = null;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.data.slice(state.data.findIndex(element => element.id === action.payload.id), 1);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            state.room.status = 'rejected';
            state.room.error = action.error.message;
        })
    }
});

export const getAllRooms = state => state.rooms.data;
export const roomsStatus = state => state.rooms.status;
export const getOneRoom = state => state.rooms.room.data;
export const roomStatus = state => state.rooms.room.status;

export default roomsSlice.reducer;