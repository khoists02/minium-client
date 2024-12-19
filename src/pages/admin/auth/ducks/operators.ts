import axios from "axios";
import { AppThunk } from "../../../../config/store";
import { authenticationSuccess } from "./slices";

export const getAuthenticatedUser =
    (): AppThunk =>
        async (dispatch) => {
            try {

                const data = await axios.get("/authenticatedUser");
                dispatch(authenticationSuccess(data.data?.account))
            } catch (err) {
            }
        };