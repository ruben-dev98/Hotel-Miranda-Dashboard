import { createAsyncThunk } from "@reduxjs/toolkit";
import { URI_BOOKINGS } from '../../helpers/varHelpers';
import { FakeApi, delay } from '../../helpers/funHelpersThunk';
import { EditDataThunk, iBooking } from "../../entitys/Data";

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    await delay();
    return await FakeApi(URI_BOOKINGS.getAll, URI_BOOKINGS, '', {} as iBooking);
});

export const getBooking = createAsyncThunk('bookings/getBooking', async (id: string) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.getOne, URI_BOOKINGS, id, {} as iBooking);
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (data: iBooking) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.add || '', URI_BOOKINGS, '', data);
});

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, data}: EditDataThunk) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.edit, URI_BOOKINGS, id, data);
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id: string) => {
    await delay();
    return await FakeApi(URI_BOOKINGS.delete, URI_BOOKINGS, id, {} as iBooking);
});