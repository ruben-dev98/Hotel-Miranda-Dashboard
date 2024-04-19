import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_MESSAGE, URI_MESSAGE } from "../../helpers/constants";
import { callAPI } from "../../helpers/callApi";
import { EditDataThunk } from "../../entities/Data";

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    return await callAPI({ path: PATH_MESSAGE, operation: URI_MESSAGE.getAll, methods: URI_MESSAGE });
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id: string) => {
    return await callAPI({ path: PATH_MESSAGE, operation: URI_MESSAGE.getOne, methods: URI_MESSAGE, id });
});

export const editMessage = createAsyncThunk('messages/editMessage', async ({ id, data }: EditDataThunk) => {
    return await callAPI({ path: PATH_MESSAGE, operation: URI_MESSAGE.edit, methods: URI_MESSAGE, data, id });
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id: string) => {
    return await callAPI({ path: PATH_MESSAGE, operation: URI_MESSAGE.delete, methods: URI_MESSAGE, id });
});