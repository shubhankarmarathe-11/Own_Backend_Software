import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Required for sending/receiving HTTP-only cookies
});
