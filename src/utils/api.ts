import axios from 'axios';

const API_URL = process.env.API_URL;

const axiosClient = axios.create();
axiosClient.defaults.baseURL = API_URL;

export default axiosClient;
