import { configureStore } from '@reduxjs/toolkit'
import authSlice, { authExtraActions } from './auth'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})


// export actions
export const authActions = {...authSlice.actions, ...authExtraActions}

// export state types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store