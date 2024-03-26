import { createAsyncThunk } from "@reduxjs/toolkit";
import dataRoom from '../../assets/data/rooms.json';
import { URI_ROOM } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";
import { EditDataThunk, iRoom } from "../../entitys/Data";



export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getAll, URI_ROOM, 0, { data: null }, { data: dataRoom, rooms: null });
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id: number) => {
    await delay();
    return await FakeApi(URI_ROOM.getOne, URI_ROOM, id, { data: null }, { data: dataRoom, rooms: null });
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data: iRoom) => {
    await delay();
    return await FakeApi(URI_ROOM.add || '', URI_ROOM, 0, { data }, { data: null, rooms: null });
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, data }: EditDataThunk) => {
    await delay();
    return await FakeApi(URI_ROOM.edit, URI_ROOM, id, {data}, { data: null, rooms: null });
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: number) => {
    await delay();
    return await FakeApi(URI_ROOM.delete, URI_ROOM, id, { data: null }, { data: null, rooms: null });
});

export const availableRoomsNumber = createAsyncThunk('rooms/getRoomsNumber', async () => {
    await delay();
    return await FakeApi(URI_ROOM.getRoomsNumber || '', URI_ROOM, 0, { data: null }, { data: dataRoom, rooms: null });
});