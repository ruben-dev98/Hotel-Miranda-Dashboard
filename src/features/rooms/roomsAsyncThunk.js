import { createAsyncThunk } from "@reduxjs/toolkit";
import dataRoom from '../../assets/data/rooms.json';
import { FakeApi, delay } from "../../helpers/funcHelpersThunk";
import { URI_ROOM } from "../../helpers/varHelpers";



export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getAll, URI_ROOM, 0, null, dataRoom);
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id) => {
    await delay();
    return await FakeApi(URI_ROOM.getOne, URI_ROOM, id, null, dataRoom);
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data) => {
    await delay();
    return await FakeApi(URI_ROOM.add, URI_ROOM, 0, data);
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, data }) => {
    await delay();
    return await FakeApi(URI_ROOM.edit, URI_ROOM, id, data);
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
    await delay();
    return await FakeApi(URI_ROOM.delete, URI_ROOM, id);
});

export const availableRoomsNumber = createAsyncThunk('rooms/getRoomsNumber', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getRoomsNumber, URI_ROOM, 0, null, dataRoom);
});