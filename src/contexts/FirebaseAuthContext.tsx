import { useState, createContext, useEffect, useReducer } from 'react'
import type { FC, ReactNode } from 'react'
import type { User } from 'src/types/user'
import { Roletypes } from 'src/types/user'
import SplashScreen from 'src/components/SplashScreen'
import firebase from 'src/lib/firebase'
import { tokenverify, tokensignout, savePassInfo } from 'src/common/tokenapis'
import { selectUserApiToken } from 'src/slices/userprofileSlice'
import store from 'src/store'
import { useDispatch, useSelector } from 'src/store'

interface AuthState {
	isInitialised: boolean
	isAuthenticated: boolean
	user: User | null
}

interface AuthContextValue extends AuthState {
	method: 'FirebaseAuth'
	createUserWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<any>
	signInWithEmailAndPassword: (email: string, password: string) => Promise<any>
	signInWithGoogle: () => Promise<any>
	signInWithFacebook: () => Promise<any>
	sendPasswordResetEmail: (email: string) => Promise<any>
	updatePassword: (cur_password: string, new_password: string) => Promise<any>
	sendVerificationEmail: () => Promise<any>
	updateUserProfile: (values: any) => Promise<any>
	logout: () => Promise<void>
}

interface AuthProviderProps {
	children: ReactNode
}

type AuthStateChangedAction = {
	type: 'AUTH_STATE_CHANGED'
	payload: {
		isAuthenticated: boolean
		user: User | null
	}
}

type Action = AuthStateChangedAction

const initialAuthState: AuthState = {
	isAuthenticated: false,
	isInitialised: false,
	user: null,
}

const reducer = (state: AuthState, action: Action): AuthState => {
	switch (action.type) {
		case 'AUTH_STATE_CHANGED': {
			const { isAuthenticated, user } = action.payload

			return {
				...state,
				isAuthenticated,
				isInitialised: true,
				user,
			}
		}
		default: {
			return { ...state }
		}
	}
}

const AuthContext = createContext<AuthContextValue>({
	...initialAuthState,
	method: 'FirebaseAuth',
	createUserWithEmailAndPassword: () => Promise.resolve(),
	signInWithEmailAndPassword: () => Promise.resolve(),
	signInWithGoogle: () => Promise.resolve(),
	signInWithFacebook: () => Promise.resolve(),

	sendPasswordResetEmail: () => Promise.resolve(),
	updatePassword: () => Promise.resolve(),
	sendVerificationEmail: () => Promise.resolve(),
	updateUserProfile: () => Promise.resolve(),
	logout: () => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialAuthState)
	const [PassInfo, setPassInfo] = useState({ email: '', password: '' })
	const [isPassLogin, setIsPassLogin] = useState(false)
	const userApiToken = useSelector(selectUserApiToken)
	const commonDispatch = useDispatch()
	const signInWithEmailAndPassword = (
		email: string,
		password: string
	): Promise<any> => {
		setIsPassLogin(true)
		setPassInfo({ email, password })

		return firebase.auth().signInWithEmailAndPassword(email, password)
	}

	const signInWithGoogle = (): Promise<any> => {
		const provider = new firebase.auth.GoogleAuthProvider()

		return firebase.auth().signInWithPopup(provider)
	}

	const signInWithFacebook = (): Promise<any> => {
		const provider = new firebase.auth.FacebookAuthProvider()

		return firebase.auth().signInWithPopup(provider)
	}
	const createUserWithEmailAndPassword = async (
		email: string,
		password: string
	): Promise<any> => {
		setIsPassLogin(true)
		setPassInfo({ email, password })
		var actionCodeSettings = {
			url: 'https://www.kidsfuncloud.com/login',

			handleCodeInApp: true,
		}
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((credenential) => {
				credenential.user.sendEmailVerification(actionCodeSettings)
			})
	}
	const sendPasswordResetEmail = (email: string): Promise<any> => {
		return firebase.auth().sendPasswordResetEmail(email)
	}
	const updatePassword = (
		cur_password: string,
		new_password: string
	): Promise<any> => {
		const user = firebase.auth().currentUser
		const credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			cur_password
		)
		// Now you can use that to reauthenticate
		return user.reauthenticateWithCredential(credential).then(() => {
			user.updatePassword(new_password)
		})
	}

	const updateUserProfile = (values: any): Promise<any> => {
		const user = firebase.auth().currentUser
		//console.log('Update Profile of:', user.toJSON())
		return user.updateProfile({
			displayName: values.name,
		})
	}

	const sendVerificationEmail = (): Promise<any> => {
		const user = firebase.auth().currentUser
		var actionCodeSettings = {
			url: 'https://www.kidsfuncloud.com/login',

			handleCodeInApp: true,
		}
		//console.log('Email verify:', user.toJSON())
		return user.sendEmailVerification(actionCodeSettings)
	}
	const logout = (): Promise<void> => {
		tokensignout(userApiToken) // notify backend server to logout and remove tokens.
		store.dispatch({ type: 'USER_LOGOUT' })
		return firebase.auth().signOut()
	}

	useEffect(() => {
		const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
			console.log('user status changed!')
			if (
				(user && user.emailVerified) ||
				(user && user.providerData[0].providerId === 'facebook.com')
			) {
				// Here you should extract the complete user profile to make it available in your entire app.
				// The auth state only provides basic information.
				//console.log('user info !!!', user.toJSON(), user.providerData)
				/*console.log(
					'uid;',
					user.uid,
					'refreshToken:',
					user.refreshToken,
					'providerData:',
					user.providerData,
					'metadata:',
					user.metadata,
					'providerId',
					user.providerId
				) */
				//let token = await axios()
				dispatch({
					type: 'AUTH_STATE_CHANGED',
					payload: {
						isAuthenticated: true,
						user: {
							id: user.uid,
							uid: user.uid,
							displayName: user.displayName,
							avatar: user.photoURL || '',
							email: user?.email || '',
							emailVerified:
								user.emailVerified ||
								user.providerData[0].providerId === 'facebook.com', // added
							name: user.displayName || user.email || '',
							photoURL: user.photoURL || '',
							providerId: user.providerId,
							providerData: user.providerData,
							refreshToken: user.refreshToken,
							phoneNumber: user.phoneNumber,
							metaData: user.metadata,
							//appToken:token,
							role: Roletypes.Unknown, // should get updated later from kfcloud server.
						},
					},
				})
			} else {
				dispatch({
					type: 'AUTH_STATE_CHANGED',
					payload: {
						isAuthenticated: false,
						user: null,
					},
				})

				//localStorage.apitoken = 0
			}
		})

		return unsubscribe
	}, [dispatch])
	useEffect(() => {
		if (state.user) {
			try {
				// When user logged in, verify token in server and get the app token for future JWT token authorization
				// Added user data fetching after token verify.
				tokenverify(commonDispatch)
			} catch (error) {
				console.log(error)
			}
		}
	}, [state.user, commonDispatch])
	useEffect(() => {
		if (
			userApiToken &&
			userApiToken !== '0' &&
			isPassLogin &&
			PassInfo.password !== ''
		) {
			// Backup user login info (user name and passwd)
			savePassInfo(commonDispatch, PassInfo)
		}
	}, [userApiToken, isPassLogin, PassInfo, commonDispatch])
	if (!state.isInitialised) {
		return <SplashScreen />
	}
	return (
		<AuthContext.Provider
			value={{
				...state,
				method: 'FirebaseAuth',
				createUserWithEmailAndPassword,
				signInWithEmailAndPassword,
				signInWithGoogle,
				signInWithFacebook,
				sendPasswordResetEmail,
				sendVerificationEmail,
				updatePassword,
				updateUserProfile,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
