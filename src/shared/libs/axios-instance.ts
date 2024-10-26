import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'members/json',
  },
};

const axiosInstance = axios.create(axiosConfig);

export { axiosInstance };
