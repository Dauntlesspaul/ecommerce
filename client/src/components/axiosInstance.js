import axios from 'axios';


const createAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://sho-haven-api.vercel.app',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const profileUploadAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://sho-haven-api.vercel.app',
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

export default createAxiosInstance;
