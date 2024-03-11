import { createSlice } from "@reduxjs/toolkit"
import { getRooms } from "./roomsAsyncThunk";



export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        room: {},
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
    }
});

export const getAllRooms = state => state.rooms.data;
export const roomsStatus = state => state.rooms.status;

export default roomsSlice.reducer;