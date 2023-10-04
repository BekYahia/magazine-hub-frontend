import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthy: false},
    reducers: {
        login(state) {
            state.isAuthy = true
        },
        logout(state) {
            state.isAuthy = false
        }
    }
})

export default authSlice