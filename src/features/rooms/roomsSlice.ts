import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addRoom, availableRoomsNumber, deleteRoom, editRoom, getRoom, getRooms } from "./roomsAsyncThunk";
import { iRoom } from "../../entitys/Data";
import { RootState } from "../../app/store";

interface RoomSliceState {
    data: iRoom[],
    room: iRoom,
    roomsAvailable: string[],
    status: string,
    error: string | null
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        room: {} as iRoom,
        roomsAvailable: [],
        status: 'idle',
        error: null
    } as RoomSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            state.room = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(addRoom.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(editRoom.fulfilled, (state, action) => {
            state.data = state.data.map((room) => room.id === action.payload.id ? action.payload.data : room);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.data = state.data.filter((room) => room.id !== action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(availableRoomsNumber.fulfilled, (state, action) => {
            state.roomsAvailable = action.payload;
            state.status = 'fulfilled';
            state.error = null;
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
            state.error = action.error.message || null;
        })
        
    }
});

export const getAllRooms = (state: RootState) => state.rooms.data;
export const roomsStatus = (state: RootState) => state.rooms.status;
export const getOneRoom = (state: RootState) => state.rooms.room;
export const roomStatus = (state: RootState) => state.rooms.room.status;
export const availableRooms = (state: RootState) => state.rooms.roomsAvailable;

export default roomsSlice.reducer;