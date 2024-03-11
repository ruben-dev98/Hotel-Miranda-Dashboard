import { createSlice } from "@reduxjs/toolkit"



const employees = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: {

    }
});

export const { employeesReducer } = employees.reducer;