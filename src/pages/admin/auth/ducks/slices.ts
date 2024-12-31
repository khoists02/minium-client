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
    authClearState: () => initialState,
    authenticationSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.sessionHasBeenFetched = true;
      state.account = action.payload;
    },
  },
});

export const { authClearState, authenticationSuccess } = authSlice.actions;
export default authSlice.reducer;
