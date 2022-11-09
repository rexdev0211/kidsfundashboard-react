import axios from 'src/utils/axios'
import { addAuthToken } from 'src/utils/axios' // put auth token into axios instance configuration
import firebase from 'src/lib/firebase'
import jwt_decode from 'jwt-decode'
import {
	setApitokenReady,
	getUserData,
	sendPassInfo,
} from 'src/slices/userprofileSlice'
import { getEvents } from 'src/slices/calendarSlice'
// authuser is profile object of a authorized user
// data sent: Json object { IdToken, user}

export const tokenregister = async (authuser) => {
	// get Id Token //
	const idToken = await firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
	//console.log("idToken is :", idToken);
	// authuser = this.props.auth;

	// Send token and user to your backend via HTTPS
	// Backend will verify token and register user
	//console.log('user is ', authuser)
	let response = await axios.post(
		'/api/tokenregister',
		JSON.stringify({ token: idToken, user: authuser }),
		{
			headers: { 'Content-Type': 'application/json' },
		}
	)
	if (response.status === 201) {
		//localStorage.apitoken = response.data.token;
		//console.log('verify status:', response, localStorage.apitoken)
		return response.data.token
	} else {
		throw new Error('Server response failed: ' + response.statusText)
	}
}

// tokenverify will verify firebase IdToken and return app api token from kfcloud server and get user data from kfcloud.
// It also sent old apitoken to delete from database.
// data sent: json object { IdToken, email, oldApiToken}
export const tokenverify = async (commonDispatch) => {
	const idToken = await firebase.auth().currentUser.getIdToken(true) // forceRefresh with true option

	const user = firebase.auth().currentUser
	// Send token to your backend via HTTPS
	var oldApiToken = '0' // mark as new token if 0.
	/*if (localStorage.apitoken) {
		oldApiToken = localStorage.apitoken
	}   */
	let response = await axios.post(
		'/api/verify',
		JSON.stringify({ token: idToken, email: user.email, oldApiToken }),
		{
			headers: { 'Content-Type': 'application/json' },
		}
	)
	if (response.status === 200 || response.status === 201) {
		// save server app token into local storage-  not safe, disabled.
		//localStorage.apitoken = response.data.token
		const mytoken = response.data.token.toString()
		//console.log('mytoken', mytoken)
		addAuthToken(mytoken)
		commonDispatch(setApitokenReady(mytoken)) // update store that new apitoken is stored and ready for future use
		//console.log('user verified with returned token', localStorage.apitoken)
		//Get user data
		commonDispatch(getUserData())
		commonDispatch(getEvents(new Date())) // force to get events data when refresh
		return response.data.token
	} else {
		localStorage.apitoken = 0

		throw new Error('Server response failed: ' + response.statusText)
	}
}

// if jwt token is expired, then return true
export const isTokenExpired = (token) => {
	var current_time = Date.now().valueOf() / 1000
	const decoded = jwt_decode(token)
	if (decoded.exp < current_time) {
		return true
	}
	return false
}
// check if token is expired, if expired, renew token.
// Todo:
// during logout, apitoken may be expired.
// export const getApiToken = async () => {
// 	const apitoken = localStorage.apitoken
// 	if (apitoken && !isTokenExpired(apitoken)) {
// 		console.log('Found valid apintoken!')
// 		//setTimeout(function () {}, 200)
// 		return apitoken
// 	}
// 	// renew firebase token and get a new app token from backend server
// 	if (!!firebase.auth().currentUser) {
// 		localStorage.apitoken = await tokenverify()
// 		return localStorage.apitoken
// 	}
// }
export const savePassInfo = async (commonDispatch, params) => {
	commonDispatch(sendPassInfo(params))
}
export const tokensignout = async (userApiToken) => {
	// logout from nodejs server

	const apitoken = userApiToken //localStorage.apitoken
	if (apitoken === undefined || apitoken === 0 || apitoken === '0') {
		return
	}

	if (!isTokenExpired(apitoken)) {
		const bearerToken = 'Bearer ' + apitoken
		await axios.post('/api/logout', JSON.stringify({ token: '0' }), {
			headers: {
				'Content-Type': 'application/json',
				Authorization: bearerToken,
			},
		})
		localStorage.apitoken = 0
		addAuthToken(0)
	}
}

// fetch user data from kfcloud server
export const fetchUserFromKServer = async (commonDispatch) => {}
