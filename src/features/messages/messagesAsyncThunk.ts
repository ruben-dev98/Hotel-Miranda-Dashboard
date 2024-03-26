import { createAsyncThunk } from "@reduxjs/toolkit";
import dataMessage from '../../assets/data/messages.json'; 
import { URI_MESSAGE } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    await delay();
    return await FakeApi(URI_MESSAGE.getAll, URI_MESSAGE, 0, {data: null }, {data: dataMessage, rooms: null});
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id: number) => {
    await delay();
    return await FakeApi(URI_MESSAGE.getOne, URI_MESSAGE, id, {data: null}, {data: dataMessage, rooms: null});
});

export const editMessage = createAsyncThunk('messages/editMessage', async (id: number) => {
    await delay();
    return await FakeApi(URI_MESSAGE.edit, URI_MESSAGE, id, {data: null}, {data: null, rooms: null});
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id: number) => {
    await delay();
    return await FakeApi(URI_MESSAGE.delete, URI_MESSAGE, id, {data: null}, {data: null, rooms: null});
});