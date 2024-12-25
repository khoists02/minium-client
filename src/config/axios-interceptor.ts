import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import GroupPromise from "./GroupPromise";
import { authClearState } from "../pages/admin/auth/ducks/slices";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry: boolean;
}
interface CustomAxiosError extends AxiosError {
    config: CustomAxiosRequestConfig;
}

const TIMEOUT = 1 * 60 * 1000; // 1ph
axios.defaults.timeout = TIMEOUT;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.VITE_APP_API_URL;

const originIgnore = ["/Login"];

const setupAxiosInterceptors = (store: any): void => {
    const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
        return config;
    };
    const onResponseSuccess = (response: AxiosResponse) => {
        return response;
    };
    const onResponseError = async (err: CustomAxiosError) => {
        const status = err.response?.status;
        const apiError = err?.response?.data as { code?: number };
        if (!originIgnore.includes(window.location.pathname) && status === 401 && apiError.code === 1000) {
            store.dispatch(authClearState());
            window.location.href = "/Login";
            return Promise.reject(err);
        }

        if (status === 401 && apiError.code === 1007) {
            const originalRequest = err.config;
            if (!originalRequest?._retry) {
                originalRequest._retry = true;
                const promise = GroupPromise.execute("/auth/refreshToken");
                if (promise) {
                    try {
                        await promise;
                    } catch (e) {
                        // window.location.href = "/";
                        store.dispatch(authClearState());
                        return Promise.reject(e);
                    }
                    return await axios.request(originalRequest);
                }
            }
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;