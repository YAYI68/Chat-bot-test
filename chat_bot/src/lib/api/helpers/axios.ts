import axios from 'axios';

const BASE_API_URL: string = process.env.NEXT_PUBLIC_BASE_API_URL || '';

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

