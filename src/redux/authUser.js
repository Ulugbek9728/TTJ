import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'authUser',
    initialState: {  bgCircle: true },
    reducers: {

        changeBgCircle: (state) => {
            state.bgCircle = false;
        },
        changeTrue: (state) => {
            state.bgCircle = true;
        }
    }
})


export const {changeBgCircle,changeTrue } = userSlice.actions;
export default userSlice.reducer;

