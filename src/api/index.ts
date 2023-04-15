import axios from "axios";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({baseURL});

api.interceptors.response.use(
	response => response,
	async error => {
		if (!error.response) {
			return error;
		} else if (error.response.status === 401) {
			error.response.sent = true;
			const response = await api.get("/auth/new-access");
			console.log(response.data);

			if (response.data.success == true) {
				return api(error?.config);
			} else {
				return error.response;
			}
		} else if (error.response.status === 400) {
			return error.response;
		}
		return error;
	}
);

export default api;
