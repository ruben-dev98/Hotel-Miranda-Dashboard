import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_ROOM, PATH_ROOM_AVAILABLE, URI_ROOM } from "../../helpers/constants";
import { callAPI } from "../../helpers/actionsOnApi";
import { EditDataThunk, iRoom } from "../../entities/Data";



export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    return await callAPI(PATH_ROOM, URI_ROOM.getAll, URI_ROOM, '', {} as iRoom);
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id: string) => {
    return await callAPI(PATH_ROOM, URI_ROOM.getOne, URI_ROOM, id, {} as iRoom);
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data: iRoom) => {
    return await callAPI(PATH_ROOM, URI_ROOM.add || 0, URI_ROOM, '', data);
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, data }: EditDataThunk) => {
    return await callAPI(PATH_ROOM, URI_ROOM.edit, URI_ROOM, id, data);
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: string) => {
    return await callAPI(PATH_ROOM, URI_ROOM.delete, URI_ROOM, id, {} as iRoom);
});

export const availableRoomsNumber = createAsyncThunk('rooms/getRoomsNumber', async () => {
    return await callAPI(PATH_ROOM_AVAILABLE, URI_ROOM.getRoomsNumber || 0, URI_ROOM, '', {} as iRoom);
});