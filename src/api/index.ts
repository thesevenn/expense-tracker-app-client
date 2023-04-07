import axios from "axios";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

const api = axios.create({baseURL});

api.interceptors.response.use(
	response => response,
	error => {
		if (!error.response) {
			return error;
		} else if (error.response.status === 401) {
			return error.response;
		} else if (error.response.status === 400) {
			return error.response;
		}
		return error;
	}
);

export default api;
