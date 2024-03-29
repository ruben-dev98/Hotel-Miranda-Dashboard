import { createAsyncThunk } from "@reduxjs/toolkit";
import dataEmployee from '../../assets/data/users.json';
import { URI_EMPLOYEE } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funcHelpersThunk";

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getAll, URI_EMPLOYEE, 0, null, dataEmployee);
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getOne, URI_EMPLOYEE, id, null, dataEmployee);
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.add, URI_EMPLOYEE, 0, data);
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({id, data}) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.edit, URI_EMPLOYEE, id, data);
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.delete,URI_EMPLOYEE, id);
});