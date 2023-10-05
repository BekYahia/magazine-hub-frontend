import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const magazinesExtraActions = createExtraActions();

const magazinesSlice = createSlice({
    name: 'magazines',
    initialState: {
        magazines: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: {
        [magazinesExtraActions.getMagazines.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
            state.loading = false;
            state.magazines = action.payload;

            console.log(action)
            console.log('magazines fulfilled')
        },
        [magazinesExtraActions.getMagazines.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;

            console.log(action)
            console.log('magazines rejected')
        },
        [magazinesExtraActions.getMagazines.pending.type]: (state) => {
            state.loading = true;
            state.magazines = []
            state.error = {}
            console.log('magazines pending')
        },
    },
})


function createExtraActions() {
    return {
        getMagazines: createAsyncThunk(
        'magazines/getMagazines',
            () =>
            
            axios.get(`/api/magazines`)
            .then((res) => {
                    return Promise.resolve(res.data)
                })
                .catch(err => {
                    return Promise.reject(err.response.data)
                })
        ),

    };
}

export default magazinesSlice