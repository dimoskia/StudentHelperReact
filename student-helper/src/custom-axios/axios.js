import axios from 'axios';

const getTokenFromLocalStorage = () => {
    const userString = localStorage.getItem("userData");
    if (userString !== null)
        return JSON.parse(userString).Token;
    return "";
};

const instance = axios.create({
    baseURL: 'http://localhost:53653',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = getTokenFromLocalStorage();
    return config;
});

export default instance;
