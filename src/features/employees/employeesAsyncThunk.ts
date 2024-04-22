import { createAsyncThunk } from "@reduxjs/toolkit";
import { URI_EMPLOYEE } from "../../helpers/constants";
import { callAPI } from "../../helpers/callApi";
import { EditDataThunk, iEmployee } from "../../entities/Data";
import { PATH_EMPLOYEE } from '../../helpers/constants';

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    return await callAPI({path: PATH_EMPLOYEE, operation: URI_EMPLOYEE.getAll, methods: URI_EMPLOYEE});
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id: string) => {
    return await callAPI({path: PATH_EMPLOYEE, operation: URI_EMPLOYEE.getOne, methods: URI_EMPLOYEE, id});
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data: iEmployee) => {
    return await callAPI({path: PATH_EMPLOYEE, operation: URI_EMPLOYEE.add || 0, methods: URI_EMPLOYEE, data});
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, data }: EditDataThunk) => {
    return await callAPI({path: PATH_EMPLOYEE, operation: URI_EMPLOYEE.edit, methods: URI_EMPLOYEE, id, data});
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
    return await callAPI({path: PATH_EMPLOYEE, operation: URI_EMPLOYEE.delete, methods: URI_EMPLOYEE, id});
});