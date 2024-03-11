import { createSlice } from "@reduxjs/toolkit"



export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
});

export default employeesSlice.reducer;