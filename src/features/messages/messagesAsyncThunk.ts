import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { PATH_MESSAGE, URI_MESSAGE } from "../../helpers/constants";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";
import { iMessage } from "../../entities/Data";

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    await delay();
    return await FakeApi(PATH_MESSAGE, URI_MESSAGE.getAll, URI_MESSAGE, '', {} as iMessage);
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id: string) => {
    await delay();
    return await FakeApi(PATH_MESSAGE, URI_MESSAGE.getOne, URI_MESSAGE, id, {} as iMessage);
});

export const editMessage = createAsyncThunk('messages/editMessage', async (id: string) => {
    await delay();
    return await FakeApi(PATH_MESSAGE, URI_MESSAGE.edit, URI_MESSAGE, id, {} as iMessage);
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id: string) => {
    await delay();
    return await FakeApi(PATH_MESSAGE, URI_MESSAGE.delete, URI_MESSAGE, id, {} as iMessage);
});