import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBookings from '../../assets/data/bookings.json';
import { URI_BOOKINGS } from '../../helpers/varHelpers';
import { FakeApi, delay } from '../../helpers/funHelpersThunk';
import { iBooking } from "../../entitys/Data";

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    await delay();
    return await FakeApi(URI_BOOKINGS.getAll, URI_BOOKINGS, 0, null, dataBookings as Array<iBooking>);
});

export const getBooking = createAsyncThunk('bookings/getBooking', async (id) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.getOne, URI_BOOKINGS, id, null, dataBookings);
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (data) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.add, URI_BOOKINGS, 0, data);
});

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, data}) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.edit, URI_BOOKINGS, id, data);
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.delete, URI_BOOKINGS, id);
});