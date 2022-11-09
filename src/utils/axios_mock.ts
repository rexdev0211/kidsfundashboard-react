import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) =>
		Promise.reject(
			(error.response && error.response.data) ||
				'Axios API call has error and nothing is found!'
		)
)

export default axiosInstance
