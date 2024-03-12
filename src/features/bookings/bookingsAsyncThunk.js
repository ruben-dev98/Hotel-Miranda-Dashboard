import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBookings from '../../assets/data/bookings.json';

const uri = {
    getAll: 'get/bookings',
    getOne: 'get/booking',
    add: 'add/booking',
    edit: 'edit/booking',
    delete: 'delete/booking'
};

function delay(path, id = 0, data = null, time = 800) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (path) {
                case uri.getAll:
                    resolve(dataBookings);
                    break;
                case uri.getOne:
                    resolve(dataBookings.find((booking) => booking.id === id) || null);
                    break;
                case uri.add:
                    resolve(data);
                    break;
                case uri.edit:
                    resolve(id);
                    break;
                case uri.delete:
                    resolve(id);
                    break;
                default:
                    reject('Error');
                    break;
            }
        }, time);
    })
}

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    return await delay(uri.getAll);
});

export const getBooking = createAsyncThunk('bookings/getBooking', async (id) => {
    return await delay(uri.getOne, id);
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (data) => {
    return await delay(uri.add, 0, data);
});

export const editBooking = createAsyncThunk('bookings/editBooking', async (id) => {
    return await delay(uri.edit, id);
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
    return await delay(uri.delete, id);
});