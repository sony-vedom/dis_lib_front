import {HttpError} from "@refinedev/core";
import axios from "axios";
import {authProvider} from "src/authProvider";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {COOKIE_AUTH_REFRESH} from "../../utils/Cookies";
import nookies from "nookies";

const ERROR_UNAUTHORIZED = 'Unauthorized';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.statusText === ERROR_UNAUTHORIZED) {
            authProvider.refresh();
        }

        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    }
);

// const refreshAuthLogic = (failedRequest: any) => {
//     console.log(nookies.get(null)?.[COOKIE_AUTH_REFRESH])
//     return axiosInstance.post(`${process.env.NEXT_PUBLIC_LIB_API_URL}/token/refresh/`, {
//         refresh: nookies.get(null)?.[COOKIE_AUTH_REFRESH],
//     }).then((tokenRefreshResponse) => {
//         localStorage.setItem(COOKIE_AUTH_REFRESH, "Bearer " + tokenRefreshResponse.data.token);
//
//         failedRequest.response.config.headers["Authorization"] = "Bearer " + tokenRefreshResponse.data.token;
//
//         return Promise.resolve();
//     });
// }
//
// // Instantiate the interceptor
// createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export {axiosInstance};