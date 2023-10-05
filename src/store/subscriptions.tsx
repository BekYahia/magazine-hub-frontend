import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const subscriptionsExtraActions = createExtraActions();

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        subscriptions: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: {
        //get subscriptions
        [subscriptionsExtraActions.getSubscriptions.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
            state.loading = false;
            state.subscriptions = action.payload;

            console.log(action)
            console.log('get subscriptions fulfilled')
        },
        [subscriptionsExtraActions.getSubscriptions.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;

            console.log(action)
            console.log('get subscriptions rejected')
        },
        [subscriptionsExtraActions.getSubscriptions.pending.type]: (state) => {
            state.loading = true;
            state.subscriptions = []
            state.error = {}
            console.log('get subscriptions pending')
        },

        //subscribe
        [subscriptionsExtraActions.subscribe.fulfilled.type]: (state: any) => {
            state.loading = false;
            console.log('subscribe fulfilled')
        },
        [subscriptionsExtraActions.subscribe.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;
            console.log('subscribe rejected')
        },
        [subscriptionsExtraActions.subscribe.pending.type]: (state) => {
            state.loading = true;
            state.error = {}
            console.log('subscribe pending')
        },

        // cancel subscription
        [subscriptionsExtraActions.cancelSubscription.fulfilled.type]: (state: any) => {
            state.loading = false;
            console.log('cancelSubscription fulfilled')
        },
        [subscriptionsExtraActions.cancelSubscription.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action;
            console.log('cancelSubscription rejected')
        },
        [subscriptionsExtraActions.cancelSubscription.pending.type]: (state) => {
            state.loading = true;
            state.error = {}
            console.log('cancelSubscription pending')
        },
    },
})


function createExtraActions() {
    return {
        getSubscriptions: createAsyncThunk(
        'subscriptions/getSubscriptions',
            () =>
            
            axios.get(`/api/subscriptions`)
            .then((res) => {
                    return Promise.resolve(res.data)
                })
                .catch(err => {
                    return Promise.reject(err.response.data)
                })
        ),
        subscribe: createAsyncThunk(
            'subscriptions/subscribe',
            (payload : SubscribeProps) =>
            axios.post(`/api/subscriptions`, payload)
            .then((res) => {
                return Promise.resolve(res.data)
            })
            .catch(err => {
                return Promise.reject(err.response.data)
            })
        ),
        cancelSubscription: createAsyncThunk(
            'subscriptions/cancelSubscription',
            (payload : cancelSubscriptionProps) =>
            axios.post(`/api/subscriptions/cancel`, payload)
            .then((res) => {
                return Promise.resolve(res.data)
            })
            .catch(err => {
                return Promise.reject(err.response.data)
            })
        ),
    };
}

export default subscriptionsSlice

// Interfaces
interface SubscribeProps {
    UserId: number;
    MagazineId: number;
    start_date: string;
    end_date: string;
}
interface cancelSubscriptionProps {
    UserId: number;
    MagazineId: number;
}