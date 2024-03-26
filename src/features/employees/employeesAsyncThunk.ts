import { createAsyncThunk } from "@reduxjs/toolkit";
import dataEmployee from '../../assets/data/users.json';
import { URI_EMPLOYEE } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";
import { EditDataThunk, iEmployee } from "../../entitys/Data";

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getAll, URI_EMPLOYEE, 0, {data: null}, {data: dataEmployee, rooms: null});
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id: number) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getOne, URI_EMPLOYEE, id, { data: null }, { data: dataEmployee, rooms: null });
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data: iEmployee) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.add || '', URI_EMPLOYEE, 0, {data: data}, {data: null, rooms: null});
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, data }: EditDataThunk) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.edit, URI_EMPLOYEE, id, {data}, {data: null, rooms: null});
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.delete, URI_EMPLOYEE, id, {data: null}, {data: null, rooms: null});
});