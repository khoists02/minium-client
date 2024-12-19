import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import publicPostReducer from "../pages/public/ducks/slice";
import authReducer from "../pages/admin/auth/ducks/slices";

export const store = configureStore({
    reducer: {
        publicPost: publicPostReducer,
        ath: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(), // Add custom middleware if needed
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;