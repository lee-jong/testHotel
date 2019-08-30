import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:8000/hotel/v1',
  timeout: 3 * 1000
});

export const handleError = err => {
  let error = {};

  if (err && err.response && err.response.data) {
    error = err.response.data;
  } else {
    error = err;
  }

  return Promise.reject(error);
};

export const handleSuccess = res => res.data;
