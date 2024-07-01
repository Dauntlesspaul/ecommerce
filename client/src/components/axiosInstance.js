
import axios from 'axios';

const createAxiosInstance = () => {
  let baseURL;

  if (window.location.hostname === 'localhost') {
    baseURL = 'http://localhost:8000';
  } else if (window.location.hostname === '172.20.10.14') {
    baseURL = 'http://172.20.10.14:8000';
  }

  return axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export default createAxiosInstance;

 export const profileUploadAxiosInstance = () => {
  let baseURL;

  if (window.location.hostname === 'localhost') {
    baseURL = 'http://localhost:8000';
  } else if (window.location.hostname === '172.20.10.14') {
    baseURL = 'http://172.20.10.14:8000';
  }

  return axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  });
}