import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

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

const setupAxiosInterceptors = (): void => {
    const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
        return config;
    };
    const onResponseSuccess = (response: AxiosResponse) => {
        return response;
    };
    const onResponseError = async (err: CustomAxiosError) => {
        console.error(err);
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;