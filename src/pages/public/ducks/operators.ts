import axios from "axios";
import { AppThunk } from "../../../config/store";
import { getPostsFail, getPostsSuccess, loading } from "./slice";

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