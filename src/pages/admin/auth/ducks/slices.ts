import { createSlice } from "@reduxjs/toolkit";
import { IUserResponse } from "../../../../types/general";

export interface AuthState {
    account?: IUserResponse;
    loading: boolean;
    error?: any;
    sessionHasBeenFetched?: boolean;
    isAuthenticated?: boolean;
}

const initialState: AuthState = {
    account: null,
    loading: false,
    error: null,
    sessionHasBeenFetched: false,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearState: () => initialState,
    },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;