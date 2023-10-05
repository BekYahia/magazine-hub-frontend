import { configureStore } from '@reduxjs/toolkit'
import authSlice, { authExtraActions } from './auth'
import usersSlice, { usersExtraActions } from './users'
import magazinesSlice, { magazinesExtraActions } from './magazines'
import subscriptionsSlice, { subscriptionsExtraActions } from './subscriptions'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        magazines: magazinesSlice.reducer,
        subscriptions: subscriptionsSlice.reducer,
    }
})


// export actions
export const authActions = {...authSlice.actions, ...authExtraActions}
export const usersActions = {...usersSlice.actions, ...usersExtraActions}
export const magazinesActions = {...magazinesSlice.actions, ...magazinesExtraActions}
export const subscriptionsActions = {...subscriptionsSlice.actions, ...subscriptionsExtraActions}

// export state types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store