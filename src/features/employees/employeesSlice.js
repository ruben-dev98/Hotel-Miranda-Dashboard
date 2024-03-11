import { createSlice } from "@reduxjs/toolkit"
import { getEmployees } from "./employeesAsyncThunk";



export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        employee: {},
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
    }
});

export const getAllEmployees = state => state.employees.data;
export const employeesStatus = state => state.employees.status;


export default employeesSlice.reducer;