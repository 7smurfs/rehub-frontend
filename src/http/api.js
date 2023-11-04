import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    }
});

export default api;