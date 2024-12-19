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
                const data = await axios.get("/posts/" + postId);
                dispatch(
                    getPostDetailsSuccess(
                        data.data.post
                    )
                );
            } catch (err) {
                dispatch(getPostsFail(err));
            }
        };