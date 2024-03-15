import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addRoom, availableRoomsNumber, deleteRoom, editRoom, getRoom, getRooms } from "./roomsAsyncThunk";



export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        room: {
            data: null,
            status: 'idle',
            error: null
        },
        roomsAvailable: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            state.room.data = action.payload;
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(addRoom.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(editRoom.fulfilled, (state, action) => {
            state.data = state.data.map((room) => room.id === action.payload.id ? action.payload.data : room);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.data = state.data.filter((room) => room.id === action.payload);
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addCase(availableRoomsNumber.fulfilled, (state, action) => {
            state.roomsAvailable = action.payload;
            state.room.status = 'fulfilled';
            state.room.error = null;
        })
        .addMatcher(isAnyOf (
            getRooms.pending,
            getRoom.pending,
            addRoom.pending,
            editRoom.pending,
            deleteRoom.pending,
            availableRoomsNumber.pending
            ), (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addMatcher(isAnyOf (
            getRooms.rejected,
            getRoom.rejected,
            addRoom.rejected,
            editRoom.rejected,
            deleteRoom.rejected,
            availableRoomsNumber.rejected
            ), (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        
    }
});

export const getAllRooms = state => state.rooms.data;
export const roomsStatus = state => state.rooms.status;
export const getOneRoom = state => state.rooms.room.data;
export const roomStatus = state => state.rooms.room.status;
export const availableRooms = state => state.rooms.roomsAvailable;

export default roomsSlice.reducer;