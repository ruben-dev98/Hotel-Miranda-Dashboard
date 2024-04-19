import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_ROOM, PATH_ROOM_AVAILABLE, URI_ROOM } from "../../helpers/constants";
import { callAPI } from "../../helpers/callApi";
import { EditDataThunk, iRoom } from "../../entities/Data";

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    return await callAPI({path: PATH_ROOM, operation: URI_ROOM.getAll, methods: URI_ROOM});
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id: string) => {
    return await callAPI({path: PATH_ROOM, operation: URI_ROOM.getOne, methods: URI_ROOM, id});
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data: iRoom) => {
    return await callAPI({path: PATH_ROOM, operation: URI_ROOM.add || 0, methods: URI_ROOM, data});
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, data }: EditDataThunk) => {
    return await callAPI({path: PATH_ROOM, operation: URI_ROOM.edit, methods: URI_ROOM, id, data});
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: string) => {
    return await callAPI({path: PATH_ROOM, operation: URI_ROOM.delete, methods: URI_ROOM, id});
});

export const availableRoomsNumber = createAsyncThunk('rooms/getRoomsNumber', async () => {
    return await callAPI({path: PATH_ROOM_AVAILABLE, operation: URI_ROOM.getRoomsNumber || 0, methods: URI_ROOM});
});