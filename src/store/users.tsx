import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const usersExtraActions = createExtraActions();

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: {
        [usersExtraActions.getUsers.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = action.payload;

            console.log(action)
            console.log('users fulfilled')
        },
        [usersExtraActions.getUsers.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;

            console.log(action)
            console.log('users rejected')
        },
        [usersExtraActions.getUsers.pending.type]: (state) => {
            state.loading = true;
            state.users = []
            state.error = {}
            console.log('users pending')
        },
    },
})


function createExtraActions() {
    return {
        getUsers: createAsyncThunk(
        `auth/getUsers`,
            () =>
            axios.get(`/api/users`)
            .then((res) => {
                return Promise.resolve(res.data)
            })
            .catch(err => {
                return Promise.reject(err.response.data)
            })
        ),

    };
}

export default usersSlice