import axios from 'axios';
import { env } from '../../config/env';
import { HttpError } from '../errors/HttpError';

export const api = axios.create({
    timeout: 10000,
    baseURL: env.EXTERNAL_POSTS_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//* INTERCEPTOR PARA ERRORES
api.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);