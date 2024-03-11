import { createAsyncThunk } from "@reduxjs/toolkit";
import dataMessage from '../../assets/data/messages.json'; 

const uri = {
    getAll: 'get/messages',
    getOne: 'get/message',
    edit: 'edit/message',
    delete: 'delete/message'
};

function delay(path, id = 0, data = null, time = 800) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch(path) {
                case uri.getAll:
                    resolve(dataMessage);
                    break;
                case uri.getOne:
                    resolve(dataMessage.find((message) => message.id === id) || null);
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

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    return await delay(uri.getAll);
});

export const getMessage = createAsyncThunk('messages/getMessage', async (id) => {
    return await delay(uri.getOne, id);
});

export const editMessage = createAsyncThunk('messages/editMessage', async ({id, data}) => {
    return await delay(uri.edit, id, data);
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id) => {
    return await delay(uri.delete, id);
});