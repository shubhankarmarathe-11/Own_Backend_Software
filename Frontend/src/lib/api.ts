import axios from 'axios';
import { useAuthStore } from './store';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Required for sending/receiving HTTP-only cookies
});

// Intercept every response — if the token middleware fires a 401 with
// { message: "Invalid token" }, the session is dead → mark user as logged out.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 && message === 'Invalid token') {
      useAuthStore.getState().setLoggedIn(false);
    }

    return Promise.reject(error);
  }
);
