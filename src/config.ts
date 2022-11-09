export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
}
var pubkey
if (process.env.NODE_ENV === 'production') {
	pubkey = 'pk_live_XzWllU5vRQMbsAjElEgSW0Vh00lYghx7Or'
} else {
	pubkey = 'pk_test_cVLL3S2JoGGZLNTaBcq1rojf00WoSzBfac'
}

export const stripKey = {
	pubkey,
}
/* console.log(
	'check env:',
	process.env.PORT,
	process.env.NODE_ENV,
	process.env.REACT_APP_FIREBASE_API_KEY
) */
