import { createAsyncThunk } from "@reduxjs/toolkit";
import { URI_ROOM } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";
import { EditDataThunk, iRoom } from "../../entitys/Data";



export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getAll, URI_ROOM, '', {} as iRoom);
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id: string) => {
    await delay();
    return await FakeApi(URI_ROOM.getOne, URI_ROOM, id, {} as iRoom);
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data: iRoom) => {
    await delay();
    return await FakeApi(URI_ROOM.add || '', URI_ROOM, '', data);
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, data }: EditDataThunk) => {
    await delay();
    return await FakeApi(URI_ROOM.edit, URI_ROOM, id, data);
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: string) => {
    await delay();
    return await FakeApi(URI_ROOM.delete, URI_ROOM, id, {} as iRoom);
});

export const availableRoomsNumber = createAsyncThunk('rooms/getRoomsNumber', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getRoomsNumber || '', URI_ROOM, '', {} as iRoom);
});