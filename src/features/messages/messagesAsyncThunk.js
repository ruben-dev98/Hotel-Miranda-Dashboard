import { createAsyncThunk } from "@reduxjs/toolkit";
import dataMessage from '../../assets/data/messages.json'; 
import { URI_MESSAGE } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funcHelpersThunk";

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    await delay();
    return await FakeApi(URI_MESSAGE.getAll, URI_MESSAGE, 0, null, dataMessage);
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id) => {
    await delay();
    return await FakeApi(URI_MESSAGE.getOne, URI_MESSAGE, id, null, dataMessage);
});

export const editMessage = createAsyncThunk('messages/editMessage', async (id) => {
    await delay();
    return await FakeApi(URI_MESSAGE.edit, URI_MESSAGE, id);
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id) => {
    await delay();
    return await FakeApi(URI_MESSAGE.delete, URI_MESSAGE, id);
});