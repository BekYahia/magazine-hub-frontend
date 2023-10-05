import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const authExtraActions = createExtraActions();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthy: false,
        user: {},
        loading: false,
        error: {},
    },
    reducers: {
        logout(state) {
            state.isAuthy = false
            state.user = {},
            localStorage.removeItem('__MH_TOKEN__')
            console.log('logout')
        },
    },
    extraReducers: {
        [authExtraActions.login.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
            state.isAuthy = true;
            state.loading = false;
            state.user = action.payload;

            console.log(action)
            console.log('login fulfilled')
        },
        [authExtraActions.login.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;

            console.log(action)
            console.log('login rejected')
        },
        [authExtraActions.login.pending.type]: (state) => {
            state.loading = true;
            state.error = {}
            console.log('login pending')
        },

        [authExtraActions.check_auth.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
            state.isAuthy = true;
            state.loading = false;
            state.user = action.payload;

            console.log(action)
            console.log('check fulfilled')
        },
        [authExtraActions.check_auth.rejected.type]: (state, action: PayloadAction<any>) => {
            state.isAuthy = false;
            state.loading = false;
            
            
            console.log(action)
            console.log('check rejected')
        },
    },
})


function createExtraActions() {
    return {
        login: createAsyncThunk(
        `auth/login`,
            ({ email, password }: { email: string; password: string }) =>
            axios.post(`/api/users/login`, { email, password })
            .then((res) => {

                localStorage.setItem('__MH_TOKEN__', res.headers['x-auth-token'])
                return Promise.resolve(res.data)
            })
            .catch(err => {
                return Promise.reject(err.response.data)
            })
        ),

        check_auth: createAsyncThunk(
        `auth/check_auth`,
            () =>
            axios.get(`/api/users/me`)
            .then((res) => {
                return Promise.resolve(res.data)
            })
            .catch(err => {
                return Promise.reject(err.response.data)
            })
        ),

    };
}

export default authSlice