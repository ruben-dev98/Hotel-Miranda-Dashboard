import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addEmployee, deleteEmployee, editEmployee, getEmployee, getEmployees } from "./employeesAsyncThunk";



export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        employee: {},
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
            state.employee = action.payload;
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addCase(editEmployee.fulfilled, (state, action) => {
<<<<<<< HEAD
            const index = state.data.findIndex((employee) => employee.id === action.payload.id);
            state.data[index] = action.payload.data;
            state.employee.status = 'fulfilled';
            state.employee.error = null;
        })
<<<<<<< Updated upstream
        .addCase(editEmployee.rejected, (state, action) => {
            state.employee.status = 'rejected';
            state.employee.error = action.error.message;
=======
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            state.data = state.data.filter((employee) => employee.id !== action.payload);
            state.status = 'fulfilled';
            state.error = null;
>>>>>>> Stashed changes
        })
        .addCase(deleteEmployee.pending, (state, action) => {
            state.employee.status = 'pending';
            state.employee.error = null;
=======
            state.data = state.data.map((employee) => employee.id === action.payload.id ? action.payload.data : employee);
            state.status = 'fulfilled';
            state.error = null;
>>>>>>> 3f7fe66a24d1fc1542bc0893d1d84afaa8ce123c
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            state.data = state.data.filter((employee) => employee.id === action.payload);
            state.status = 'fulfilled';
            state.error = null;
        })
        .addMatcher(isAnyOf(
            getEmployees.pending,
            getEmployee.pending,
            addEmployee.pending,
            editEmployee.pending,
            deleteEmployee.pending 
            ), (state, action) => {
            state.status = 'pending';
            state.error = null;
        })
        .addMatcher(isAnyOf(
            getEmployees.rejected,
            getEmployee.rejected,
            addEmployee.rejected,
            editEmployee.rejected,
            deleteEmployee.rejected 
            ), (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
        
    }
});

export const getAllEmployees = state => state.employees.data;
export const employeesStatus = state => state.employees.status;
export const getOneEmployee = state => state.employees.employee;


export default employeesSlice.reducer;