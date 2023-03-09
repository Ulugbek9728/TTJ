import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'authUser',
    initialState: {  bgCircle: true },
    reducers: {
        checkUser: (state, action) => {
            state.name = action.payload.name;
            state.pass = action.payload.pass;
        },
        changeBgCircle: (state) => {
            state.bgCircle = false;
        },
        changeTrue: (state) => {
            state.bgCircle = true;
        }
    }
})


export const { checkUser, changeBgCircle,changeTrue } = userSlice.actions;
export default userSlice.reducer;

