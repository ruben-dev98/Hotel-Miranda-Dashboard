import { createAsyncThunk } from "@reduxjs/toolkit";
import dataRoom from '../../assets/data/rooms.json';

const uri = {
    getAll: 'get/messages',
    getOne: 'get/message',
    edit: 'edit/message',
    delete: 'delete/message'
};

function delay(path, id = 0, data = null, time = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch(path) {
                case uri.getAll:
                    resolve(dataRoom);
                    break;
                case uri.getOne:
                    resolve(dataRoom.find((room) => room.id === id));
                    break;
                case uri.add:
                    resolve(data);
                    break;
                case uri.edit:
                    resolve({id: id, data: data});
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

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
    return await delay(uri.getAll);
});

export const getRoom = createAsyncThunk('rooms/getRoom', async (id) => {
    return await delay(uri.getOne, id);
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (data) => {
    return await delay(uri.add, 0, data);
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({id, data}) => {
    return await delay(uri.edit, id, data);
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
    return await delay(uri.delete, id);
});