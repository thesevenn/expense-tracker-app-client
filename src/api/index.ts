import axios from "axios";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

const api = axios.create({baseURL});
console.log(api.defaults.withCredentials);

export default api;
