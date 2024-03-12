import { createAsyncThunk } from "@reduxjs/toolkit";
import dataEmployee from '../../assets/data/users.json';

const uri = {
    getAll: 'get/employees',
    getOne: 'get/employee',
    add: 'add/employee',
    edit: 'edit/employee',
    delete: 'delete/employee'
};

function delay(path, id = 0, data = null, time = 800) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch(path) {
                case uri.getAll:
                    resolve(dataEmployee);
                    break;
                case uri.getOne:
                    resolve(dataEmployee.find((employee) => employee.id === id) || null);
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

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    return await delay(uri.getAll);
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id) => {
    return await delay(uri.getOne, id);
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data) => {
    return await delay(uri.add, 0, data);
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, data}) => {
    return await delay(uri.edit, id, data);
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    return await delay(uri.delete, id);
});