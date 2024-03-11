import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMessages = createAsyncThunk('messages/GetMessages', () => {

});

export const getMessage = createAsyncThunk('messages/GetMessage', () => {

});

export const addMessage = createAsyncThunk('messages/AddMessage', () => {

});

export const editMessage = createAsyncThunk('messages/EditMessage', () => {

});

export const deleteMessage = createAsyncThunk('messages/DeleteMessage', () => {

});