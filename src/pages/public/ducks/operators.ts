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
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { getPostDetailsSuccess, getPostsFail, getPostsSuccess, loading } from "./slice";

export const getPublicPosts =
    (): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(loading);
                const data = await axios.get("/public/posts");
                dispatch(
                    getPostsSuccess(
                        data.data.content
                    )
                );
            } catch (err) {
                dispatch(getPostsFail(err));
            }
        };

export const getPublicPostsDetails =
    (postId: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(loading);
                const data = await axios.get("/public/posts/" + postId);
                dispatch(
                    getPostDetailsSuccess(
                        data.data.post
                    )
                );
            } catch (err) {
                dispatch(getPostsFail(err));
            }
        };