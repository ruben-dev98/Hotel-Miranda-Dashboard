import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBookings from '../../assets/data/bookings.json';

const uri = {
    getAll: 'get/bookings',
    getOne: 'get/booking',
    add: 'add/booking',
    edit: 'edit/booking',
    delete: 'delete/booking'
};

function delay(path, id = 0, data = {}, time = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch(path) {
                case uri.getAll:
                    resolve(dataBookings);
                    break;
                case uri.getOne:
                    resolve(dataBookings.find((booking) => booking.id === id));
                    break;
                case uri.add:
                    resolve(data);
                    break;
                case uri.edit:
                    resolve(data);
                    break;
                case uri.delete:
                    resolve(data.id);
                    break;
                default:
                    reject('Error');
                    break;
            }
        }, time);
    })
}

export const getBookings = createAsyncThunk('bookings/GetBookings', async () => {
    return await delay(uri.getAll);
});

export const getBooking = createAsyncThunk('bookings/GetBooking', async (id) => {
    return await delay(uri.getOne, id);
});

export const addBooking = createAsyncThunk('bookings/AddBooking', async (data) => {
    return await delay(uri.add, 0, data);
});

export const editBooking = createAsyncThunk('bookings/EditBooking', async ({id, data }) => {
    return await delay(uri.edit, id, data);
});

export const deleteBooking = createAsyncThunk('bookings/DeleteBooking', async ({id, data}) => {
    return await delay(uri.delete, id, data);
});