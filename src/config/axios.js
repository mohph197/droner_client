import Axios from 'axios';

const axios = Axios.create({
	baseURL: import.meta.env.VITE_GATEWAY_URL,
});

// axios.interceptors.request.use((config) => {
// 	const token = getAccessToken();
// 	config.headers.Authorization = `Bearer ${token}`;
// 	config.headers['Content-Type'] = 'application/json';
// 	return config;
// });

export default axios;
