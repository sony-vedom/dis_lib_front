import {HttpError} from "@refinedev/core";
import axios, {AxiosError} from "axios";
import {authProvider} from "src/authProvider";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {COOKIE_AUTH_ACCESS, COOKIE_AUTH_REFRESH} from "../../utils/Cookies";
import nookies from "nookies";

const ERROR_UNAUTHORIZED = 'Unauthorized';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error.response?.statusText === ERROR_UNAUTHORIZED) {
        //    authProvider.refresh(error.request.responseURL);
        // }

        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    }
);

const refreshAuthLogic = async (failedRequest: any) => {
    try {
        const {data: {access}} = await axiosInstance.post(`${process.env.NEXT_PUBLIC_LIB_API_URL}/token/refresh/`, {
            refresh: nookies.get(null)?.[COOKIE_AUTH_REFRESH],
        });
        nookies.set(null, COOKIE_AUTH_ACCESS, access);
        failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
        return await Promise.resolve();
    } catch (error: any) {
        await authProvider.logout(error)
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    }
}

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export {axiosInstance};
