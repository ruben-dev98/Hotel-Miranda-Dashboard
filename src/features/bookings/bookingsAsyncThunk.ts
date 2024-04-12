import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_BOOKING, URI_BOOKINGS } from '../../helpers/constants';
import { FakeApi, delay } from '../../helpers/funHelpersThunk';
import { EditDataThunk, iBooking } from "../../entities/Data";

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    await delay();
    return await FakeApi(PATH_BOOKING, URI_BOOKINGS.getAll, URI_BOOKINGS, '', {} as iBooking);
});

export const getBooking = createAsyncThunk('bookings/getBooking', async (id: string) => {
    await delay();
    return await FakeApi(PATH_BOOKING, URI_BOOKINGS.getOne, URI_BOOKINGS, id, {} as iBooking);
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (data: iBooking) => {
    await delay();
    return await FakeApi(PATH_BOOKING, URI_BOOKINGS.add || 0, URI_BOOKINGS, '', data);
});

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, data}: EditDataThunk) => {
    await delay();
    return await FakeApi(PATH_BOOKING, URI_BOOKINGS.edit, URI_BOOKINGS, id, data);
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id: string) => {
    await delay();
    return await FakeApi(PATH_BOOKING, URI_BOOKINGS.delete, URI_BOOKINGS, id, {} as iBooking);
});