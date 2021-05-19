import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
axiosConfig.defaults.headers.common["Authorization"] =
  localStorage.getItem("token");

axiosConfig.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
export default axiosConfig;
