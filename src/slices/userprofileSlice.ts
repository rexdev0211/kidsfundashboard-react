import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from 'src/store'
import axios from 'src/utils/axios'
import { Roletypes, User } from 'src/types/user'
import type { RootState } from 'src/store'

interface userProfileState {
	userProfileData: User
	apitoken: string
	isProfileLoading: boolean
}

const initialState: userProfileState = {
	userProfileData: {
		id: '',
		uid: '',
		displayName: '',
		avatar: '',
		email: '',
		emailVerified: false, // added
		name: '',
		photoURL: '',
		providerId: '',
		providerData: [],
		refreshToken: '',
		metaData: {},
		managedClubs: [],
		//role: Roletypes.Unknown, //commented it to avoid RoleSelection form flash.
	},
	apitoken: '0',
	isProfileLoading: false,
}

const slice = createSlice({
	name: 'userinfo',
	initialState,
	reducers: {
		saveUserData(
			state: userProfileState,
			action: PayloadAction<{ userProfileData: User }>
		) {
			const { userProfileData } = action.payload

			state.userProfileData = userProfileData
		},
		updateUserRole(
			state: userProfileState,
			action: PayloadAction<{ role: typeof Roletypes[keyof typeof Roletypes] }>
		) {
			const { role } = action.payload

			state.userProfileData = { ...state.userProfileData, role }
		},
		getUserData(
			state: userProfileState,
			action: PayloadAction<{ userProfileData: User }>
		) {
			const { userProfileData } = action.payload

			state.userProfileData = { ...state.userProfileData, ...userProfileData }
		},
		deactivateClub(
			state: userProfileState,
			action: PayloadAction<{ clubid: string }>
		) {
			const { clubid } = action.payload
			const updatedManagedClubs = state.userProfileData.managedClubs.map(
				(club) => {
					if (club.clubid === clubid) {
						club.active = false
					}
					return club
				}
			)
			state.userProfileData.managedclubs = updatedManagedClubs
		},
		activateClub(
			state: userProfileState,
			action: PayloadAction<{ clubid: string }>
		) {
			const { clubid } = action.payload
			const updatedManagedClubs = state.userProfileData.managedClubs.map(
				(club) => {
					if (club.clubid === clubid) {
						club.active = true
					}
					return club
				}
			)
			state.userProfileData.managedclubs = updatedManagedClubs
		},
		setApitokenReady(
			state: userProfileState,
			action: PayloadAction<{ apitoken: string }>
		) {
			const { apitoken } = action.payload
			state.apitoken = apitoken
		},
		profileLoadingTrue(
			state: userProfileState,
			_: PayloadAction<{ userProfileData: User }>
		) {
			state.isProfileLoading = true
		},
		profileLoadingFalse(
			state: userProfileState,
			_: PayloadAction<{ userProfileData: User }>
		) {
			state.isProfileLoading = false
		},
	},
})

export const reducer = slice.reducer
/// Save user login info to backend server for backup.
export const sendPassInfo =
	(params: { email: string; password: string }): AppThunk =>
	async (dispatch) => {
		try {
			//console.log('params:', params)
			const encoder = new TextEncoder()
			const code = encoder.encode(params.password).toString()

			const response = await axios.post<{ userProfileData: User }>(
				'/api/profile',
				{ params: { email: params.email, code } }
			)
			console.log(response)
		} catch (err) {
			console.log(`x ${err} `)
		}
	}
export const saveUserData =
	(params: { role: string }): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.patch<{ userProfileData: User }>(
				'/api/profile',
				{ params }
			)
			console.log(response)
			dispatch(slice.actions.saveUserData(response.data))
		} catch (err) {
			console.log(`x ${err} `)
		}
	}

export const updateUserRole =
	(params: { role: typeof Roletypes[keyof typeof Roletypes] }): AppThunk =>
	async (dispatch) => {
		try {
			await axios.patch('/api/profile', { params })
			//console.log(response)
			dispatch(slice.actions.updateUserRole(params))
		} catch (err) {
			console.log(`x ${err} `)
		}
	}

export const getUserData = (): AppThunk => async (dispatch) => {
	try {
		dispatch(slice.actions.profileLoadingTrue())
		const response = await axios.get('/api/profile')
		console.log('Getting user data:', response)
		dispatch(slice.actions.getUserData({ userProfileData: response.data }))
		dispatch(slice.actions.profileLoadingFalse())
	} catch (err) {
		console.log('Getting user data from Kserver failed')
		dispatch(slice.actions.profileLoadingFalse())
	}
}
export const activateClub =
	(params: { clubid: string }): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post('/api/club/activate/' + params.clubid)
			if (response.status === 200) {
				dispatch(slice.actions.activateClub({ clubid: params.clubid }))
				return 'success'
			}
		} catch (error) {
			return 'failed'
		}
	}
export const deactiveClub =
	(params: { clubid: string }): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post('/api/club/deactivate/' + params.clubid)
			if (response.status === 200) {
				dispatch(slice.actions.deactivateClub({ clubid: params.clubid }))
				return 'success'
			}
		} catch (error) {
			return 'failed'
		}
	}
export const setApitokenReady =
	(apitoken): AppThunk =>
	(dispatch) => {
		//console.log('setApitokenReady:', apitoken)
		dispatch(slice.actions.setApitokenReady({ apitoken }))
	}

export const selectUser = (state: RootState): User => state.user.userProfileData
export const selectUserApiToken = (state: RootState): string =>
	state.user.apitoken
export const selectUserProfileStatus = (state: RootState): boolean =>
	state.user.isProfileLoading

export default slice
