import Axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': `application/json`,
    },
};
export const apiClient = Axios.create(axiosConfig);
