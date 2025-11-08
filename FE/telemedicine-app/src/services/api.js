import axios from 'axios';

// In dev, prefer Vite proxy by using a relative baseURL to avoid CORS entirely.
// In prod, override with VITE_API_BASE_URL.
const computedBaseURL =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api/v1' : 'http://localhost:8080/api/v1');

const api = axios.create({
	baseURL: computedBaseURL,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// TODO: điều hướng về trang đăng nhập khi token hết hạn
			localStorage.removeItem('token');
		}
		return Promise.reject(error);
	},
);

export default api;
