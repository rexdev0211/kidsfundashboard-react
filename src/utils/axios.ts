import axios, { AxiosInstance } from 'axios'
var jwtEncode = require('jwt-encode')
const production_ApiURL = 'https://api.kidsfuncloud.com/'
const dev_ApiURL = 'http://localhost:5100'
//const dev_ApiURL= '/'

let axiosInstance: AxiosInstance
//console.log('process.env:', process.env.NODE_ENV, process.env.REACT_APP_USE_API)
if (process.env.NODE_ENV === 'production') {
	axiosInstance = axios.create({
		baseURL: production_ApiURL,
	})
} else {
	if (process.env.REACT_APP_USE_API) {
		axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_USE_API,
		})
		console.log('using api:', process.env.REACT_APP_USE_API)
	} else {
		axiosInstance = axios.create({
			baseURL: dev_ApiURL,
		})
		console.log('using local api:', dev_ApiURL)
	}
	//axiosInstance = axios.create()
}
/* axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		return Promise.reject(error)
	}
) */

export default axiosInstance

//const authAxiosInstance = axios.create( )
// Add authorization token to axios instance
export function addAuthToken(GApiToken: string) {
	axiosInstance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config.headers = {
				Authorization: `Bearer ${GApiToken}`,
				//Authorization: `Bearer ${localStorage.apitoken}`,
				...config.headers,
			}

			return config
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error)
		}
	)
}

export function setAnonymAuthToken() {
	const curDate = new Date()
	// secrete example: 20219
	const secret =
		curDate.getUTCFullYear().toString() +
		curDate.getUTCMonth().toString() +
		'kidsfuncloud'

	const data = {
		id: '001',
		name: 'anonymous',
	}
	//console.log(secret)
	const AnonymToken = jwtEncode(data, secret)
	axiosInstance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config.headers = {
				Authorization: `Bearer ${AnonymToken}`,
				//Authorization: `Bearer ${localStorage.apitoken}`,
				...config.headers,
			}

			return config
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error)
		}
	)
}
