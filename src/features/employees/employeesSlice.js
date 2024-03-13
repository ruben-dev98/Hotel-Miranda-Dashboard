import { createSlice } from "@reduxjs/toolkit"
import { addEmployee, deleteEmployee, editEmployee, getEmployee, getEmployees } from "./employeesAsyncThunk";



export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        employee: {
            data: null,
            status: 'idle',
            error: null
        },
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployees.pending, (state, action) => {
            state.status = 'pending';
            state.erro = null;
        })
        .addCase(getEmployees.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getEmployees.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        .addCase(getEmployee.pending, (state, action) => {
            state.employee.status = 'pending';
            state.employee.error = null;
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
            state.employee.data = action.payload;
            state.employee.status = 'fulfilled';
            state.employee.error = null;
        })
        .addCase(getEmployee.rejected, (state, action) => {
            state.employee.status = 'rejected';
            state.employee.error = action.error.message;
        })
        .addCase(addEmployee.pending, (state, action) => {
            state.employee.status = 'pending';
            state.employee.error = null;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.employee.status = 'fulfilled';
            state.employee.error = null;
        })
        .addCase(addEmployee.rejected, (state, action) => {
            state.employee.status = 'rejected';
            state.employee.error = action.error.message;
        })
        .addCase(editEmployee.pending, (state, action) => {
            state.employee.status = 'pending';
            state.employee.error = null;
        })
        .addCase(editEmployee.fulfilled, (state, action) => {
            const index = state.data.findIndex((employee) => employee.id === action.payload.id);
            state.data[index] = action.payload.data;
            state.employee.status = 'fulfilled';
            state.employee.error = null;
        })
        .addCase(editEmployee.rejected, (state, action) => {
            state.employee.status = 'rejected';
            state.employee.error = action.error.message;
        })
        .addCase(deleteEmployee.pending, (state, action) => {
            state.employee.status = 'pending';
            state.employee.error = null;
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            const index = state.data.findIndex((employee) => employee.id === action.payload);
            state.data.splice(index, 1);
            state.employee.status = 'fulfilled';
            state.employee.error = null;
        })
        .addCase(deleteEmployee.rejected, (state, action) => {
            state.employee.status = 'rejected';
            state.employee.error = action.error.message;
        })
    }
});

export const getAllEmployees = state => state.employees.data;
export const employeesStatus = state => state.employees.status;
export const getOneEmployee = state => state.employees.employee.data;
export const employeeStatus = state => state.employees.employee.status;


export default employeesSlice.reducer;