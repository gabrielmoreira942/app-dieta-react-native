import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://app-dieta-backend-2.onrender.com'
})