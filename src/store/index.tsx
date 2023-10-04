import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})


// export actions
export const authActions = authSlice.actions

// export state types
export type RootState = ReturnType<typeof store.getState>

export default store