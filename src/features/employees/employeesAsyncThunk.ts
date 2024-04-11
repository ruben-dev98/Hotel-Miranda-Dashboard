import { createAsyncThunk } from "@reduxjs/toolkit";
import { URI_EMPLOYEE } from "../../helpers/varHelpers";
import { FakeApi, delay } from "../../helpers/funHelpersThunk";
import { EditDataThunk, iEmployee } from "../../entities/Data";

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getAll, URI_EMPLOYEE, '', {} as iEmployee);
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id: string) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.getOne, URI_EMPLOYEE, id, {} as iEmployee);
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data: iEmployee) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.add || '', URI_EMPLOYEE, '', data);
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, data }: EditDataThunk) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.edit, URI_EMPLOYEE, id, data);
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
    await delay();
    return await FakeApi(URI_EMPLOYEE.delete, URI_EMPLOYEE, id, {} as iEmployee);
});