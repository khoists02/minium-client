import { createSlice } from "@reduxjs/toolkit";
import { IPostResponse } from "../../../types/general";

export interface PublicPostState {
    entities: IPostResponse[];
    loading: boolean;
    error?: any;
}

const initialState: PublicPostState = {
    entities: [],
    loading: false,
    error: null,
};

const publicPostSlice = createSlice({
    name: "publicPost",
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        getPostsSuccess: (state, action) => {
            state.entities = action.payload;
        },
        getPostsFail: (state, action) => {
            state.error = action.payload;
        },
        clearState: () => initialState,
    },
});

export const { loading, getPostsSuccess, getPostsFail } = publicPostSlice.actions;
export default publicPostSlice.reducer;