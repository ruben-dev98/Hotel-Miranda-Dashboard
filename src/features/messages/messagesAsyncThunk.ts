import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { PATH_MESSAGE, URI_MESSAGE } from "../../helpers/constants";
import { callAPI } from "../../helpers/actionsOnApi";
import { EditDataThunk, iMessage } from "../../entities/Data";

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    return await callAPI(PATH_MESSAGE, URI_MESSAGE.getAll, URI_MESSAGE, '', {} as iMessage);
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id: string) => {
    return await callAPI(PATH_MESSAGE, URI_MESSAGE.getOne, URI_MESSAGE, id, {} as iMessage);
});

export const editMessage = createAsyncThunk('messages/editMessage', async ({id, data}: EditDataThunk) => {
    return await callAPI(PATH_MESSAGE, URI_MESSAGE.edit, URI_MESSAGE, id, data);
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id: string) => {
    return await callAPI(PATH_MESSAGE, URI_MESSAGE.delete, URI_MESSAGE, id, {} as iMessage);
});