import { HttpError } from "@refinedev/core";
import axios from "axios";
import { authProvider } from "src/authProvider";

const ERROR_UNAUTHORIZED = 'Unauthorized';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.message === ERROR_UNAUTHORIZED) {
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

export { axiosInstance };
