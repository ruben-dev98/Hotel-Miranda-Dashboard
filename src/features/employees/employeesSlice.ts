import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addEmployee, deleteEmployee, editEmployee, getEmployee, getEmployees } from "./employeesAsyncThunk";
import { RootState } from "../../app/store";
import { iEmployee } from "../../entitys/Data";

interface EmployeeSliceState {
    data: iEmployee[],
    employee: iEmployee,
    status: string,
    error: string | null
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        employee: {} as iEmployee,
        status: 'idle',
        error: null
    } as EmployeeSliceState,
    reducers: {},
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
                state.data = state.data.map((employee) => employee.id === action.payload.id ? action.payload.data : employee);
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.data = state.data.filter((employee) => employee.id !== action.payload);
                state.status = 'fulfilled';
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
                state.error = action.error.message || null;
            })

    }
});

export const getAllEmployees = (state: RootState) => state.employees.data;
export const employeesStatus = (state: RootState) => state.employees.status;
export const getOneEmployee = (state: RootState) => state.employees.employee;


export default employeesSlice.reducer;