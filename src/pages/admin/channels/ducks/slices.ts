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
import { Channels, ListChannels } from "../../../../types/channels";
import { IPostResponse } from "../../../../types/general";

export interface ChannelState {
  loading: boolean;
  error?: any;
  channels: ListChannels;
  channel: Channels | null;
  posts: IPostResponse[];
}

const initialState: ChannelState = {
  loading: false,
  error: null,
  channels: [],
  channel: null,
  posts: [],
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    clearState: () => initialState,
    getAllChannels(state, action) {
      state.channels = action.payload;
    },
    getChannel(state, action) {
      state.channel = action.payload;
    },
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { clearState, getAllChannels, getChannel, getPosts } =
  channelSlice.actions;
export default channelSlice.reducer;
