/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import { createSlice } from "@reduxjs/toolkit";
import { IPostResponse } from "../../../types/general";

export interface PublicPostState {
    entities: IPostResponse[];
    post?: IPostResponse;
    loading: boolean;
    error?: any;
}

const initialState: PublicPostState = {
    entities: [],
    loading: false,
    error: null,
    post: null,
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
        getPostDetailsSuccess(state, action) {
            state.post = action.payload;
        },
        clearState: () => initialState,
    },
});

export const { loading, getPostsSuccess, getPostsFail, getPostDetailsSuccess } = publicPostSlice.actions;
export default publicPostSlice.reducer;