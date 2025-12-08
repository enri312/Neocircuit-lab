import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy will handle it
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
