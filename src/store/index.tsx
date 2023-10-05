import { configureStore } from '@reduxjs/toolkit'
import authSlice, { authExtraActions } from './auth'
import usersSlice, { usersExtraActions } from './users'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
    }
})


// export actions
export const authActions = {...authSlice.actions, ...authExtraActions}
export const usersActions = {...usersSlice.actions, ...usersExtraActions}

// export state types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store