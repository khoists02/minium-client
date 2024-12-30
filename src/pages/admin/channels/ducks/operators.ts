import axios from "axios";
import { AppThunk } from "../../../../config/store";
import { getAllChannels, getChannel, getPosts } from "./slices";

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
export const getChannels = (): AppThunk => async (dispatch) => {
  try {
    const data = await axios.get("/channels");
    dispatch(getAllChannels(data.data?.content));
  } catch (err) {}
};

export const getChannelsDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await axios.get(`/channels/${id}`);
      dispatch(getChannel(data.data?.channel));
    } catch (err) {}
  };

export const getAllPostsOfChannel =
  (channelId: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await axios.get(`/channels/${channelId}/posts`);
      dispatch(getPosts(data.data?.content));
    } catch (err) {}
  };
