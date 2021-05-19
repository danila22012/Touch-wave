import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem('token')

export default instance;