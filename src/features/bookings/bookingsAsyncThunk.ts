import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_BOOKING, URI_BOOKINGS } from '../../helpers/constants';
import { callAPI } from '../../helpers/callApi';
import { EditDataThunk, iBooking } from "../../entities/Data";

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    return await callAPI({path: PATH_BOOKING, operation: URI_BOOKINGS.getAll, methods: URI_BOOKINGS});
});

export const getBooking = createAsyncThunk('bookings/getBooking', async (id: string) => {
    return await callAPI({path: PATH_BOOKING, operation: URI_BOOKINGS.getOne, methods: URI_BOOKINGS, id});
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (data: iBooking) => {
    return await callAPI({path: PATH_BOOKING, operation: URI_BOOKINGS.add || 0, methods: URI_BOOKINGS, data});
});

export const editBooking = createAsyncThunk('bookings/editBooking', async ({id, data}: EditDataThunk) => {
    return await callAPI({path: PATH_BOOKING, operation: URI_BOOKINGS.edit, methods: URI_BOOKINGS, id, data});
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id: string) => {
    return await callAPI({path: PATH_BOOKING, operation: URI_BOOKINGS.delete, methods: URI_BOOKINGS, id});
});