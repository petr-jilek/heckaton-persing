import axios from 'axios';
import { toast } from 'react-toastify';

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "https://inventura.flexibee.eu/v2/c/";

axios.interceptors.request.use(config => {
    return config;
})

axios.interceptors.response.use(async response => {
    return response.data;
}, error => {
    const { data, status, config, headers } = error.response;
    toast.error(data);
    return Promise.reject(error);
})
