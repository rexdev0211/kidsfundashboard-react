import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from 'src/store'
import axios from 'src/utils/axios' // Need user authorization
import uploadAxios from 'axios' // No authrization needed

import type { ClubInfo } from 'src/types/clubinfo'
import type { RootState } from 'src/store'
import {
	getThumbImageToBlob,
	resizeImageToBlob,
} from 'src/utils/resizeImageToBlob'

interface clubInfoState {
	clubInfoData: ClubInfo
	isClubLoading: boolean
}
interface FileWithPreview extends File {
	preview: string
}
function capitalizeStr(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
function reverse(s) {
	return s.split('').reverse().join('')
}
const initialState: clubInfoState = {
	clubInfoData: {
		clubName: '',
		registerRole: 'Parent',
		clubCategories: [],
		category: [],
		category0: [],
		category1: [],
		category2: [],
		streetAddress: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'United States',
		description: '',
		clubContactName: '', // main contact person name
		clubEmail: '',
		clubEmailVerified: false,
		clubPhone: '',
		socialLink1: '',
		socialLink2: '',
		ageMin: 3,
		ageMax: 99,
		boy: false,
		girl: false,
		onlineClass: false,
		freetrialClass: false,
		beginnerClass: false,
		intermediateClass: false,
		advancedClass: false,
		privateClass: false,
		classSizeMin: 1, // main contact person name
		classSizeMax: 1,
		priceMin: 0, // tuition min
		priceMax: 0, // tuition max
		priceCurrency: 'USD',
		priceUnit: 'per class', // 'per month' 'per week' or 'per year'
		otherCost: '',
		clubid: '',
		photoUrls: [],
		photoThumbUrls: [],
		views: 0,
		recommendations: 0,
		active: true,
	},
	isClubLoading: false,
}

const slice = createSlice({
	name: 'clubinfo',
	initialState,
	reducers: {
		saveClubInfoData(
			state: clubInfoState,
			action: PayloadAction<{ clubInfoData: ClubInfo }>
		) {
			const { clubInfoData } = action.payload
			state.clubInfoData = { ...state.clubInfoData, ...clubInfoData }
		},
		updateClubInfoData(
			state: clubInfoState,
			action: PayloadAction<{ params: Object }>
		) {
			const { params } = action.payload
			state.clubInfoData = { ...state.clubInfoData, ...params }
		},
		addPhotos(
			state: clubInfoState,
			action: PayloadAction<{ photoUrls: string[] }>
		) {
			const { photoUrls } = action.payload
			const newPhotoUrls = state.clubInfoData.photoUrls.concat(photoUrls)

			state.clubInfoData = {
				...state.clubInfoData,
				...{ photoUrls: newPhotoUrls },
			}
		},
		addThumbPhotos(
			state: clubInfoState,
			action: PayloadAction<{ photoUrls: string[] }>
		) {
			const { photoUrls } = action.payload
			const newPhotoUrls = state.clubInfoData.photoThumbUrls.concat(photoUrls)

			state.clubInfoData = {
				...state.clubInfoData,
				...{ photoThumbUrls: newPhotoUrls },
			}
		},
		getClubInfoData(
			state: clubInfoState,
			action: PayloadAction<{ clubInfoData: ClubInfo }>
		) {
			const { clubInfoData } = action.payload

			state.clubInfoData = { ...state.clubInfoData, ...clubInfoData }
		},
		incClubRecom(state: clubInfoState, action: PayloadAction) {
			const recom = (state.clubInfoData.recommendations || 0) + 1
			state.clubInfoData = { ...state.clubInfoData, ...{ recom } }
		},
		resetClubInfo(
			state: clubInfoState,
			_: PayloadAction<{ clubInfoData: ClubInfo }>
		) {
			state.clubInfoData = initialState.clubInfoData
		},
		setLoadingTrue(state: clubInfoState) {
			state.isClubLoading = true
		},
		setLoadingFalse(state: clubInfoState) {
			state.isClubLoading = false
		},
	},
})

export const reducer = slice.reducer
export const registerClubInfoData =
	(params: ClubInfo): AppThunk =>
	async (dispatch) => {
		try {
			// fix registerRole capitalization  problem. i.e 'parent'-> 'Parent'
			const fixedparams = params.registerRole
				? {
						...params,
						registerRole: capitalizeStr(params.registerRole),
				  }
				: params
			dispatch(
				slice.actions.saveClubInfoData({
					clubInfoData: fixedparams,
				})
			)

			const response = await axios.post('/api/club/register', {
				params: fixedparams,
			})
			//console.log('response:', response)
			dispatch(
				slice.actions.saveClubInfoData({
					clubInfoData: { clubid: response.data.clubid } as any,
				})
			)
			//console.log(response.data)
			return response.status
		} catch (error) {
			//console.log(error.response.data)
			//console.log(error.response.status)
			/* 			switch (error.response.data.code) {
				case '001':
					throw new Error('User email is not verified.')

				case '002':
					throw new Error('The club already exists..')
				case '003':
					throw new Error('The club already exists..')
				default:
				
			} */
			//console.log(error.response.headers)
			//console.log('Register error:', error)
			checkErrorForDisplay(error)
		}
	}

export const updateClubInfoData =
	(params: any): AppThunk =>
	async (dispatch) => {
		try {
			const fixedparams = params.registerRole
				? {
						...params,
						registerRole: capitalizeStr(params.registerRole),
				  }
				: params
			dispatch(
				slice.actions.updateClubInfoData({
					params: fixedparams,
				})
			)

			const response = await axios.patch('/api/club/profile/' + params.clubid, {
				params: fixedparams,
			})
			// use dispatch to update submit status
			return response.status
		} catch (error) {
			checkErrorForDisplay(error)
		}
	}
export const incClubRecom =
	(params: any): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post(
				'/api/club/pubprofile/' + params.clubid + '/recom',
				params
			)
			dispatch(slice.actions.incClubRecom())
			// use dispatch to update submit status
			return response.status
		} catch (error) {
			console.log(error)
			//checkErrorForDisplay(error)
		}
	}

// clubInfoCheckError will check the error body and throw another error with the server message for later error display.
function checkErrorForDisplay(error: any) {
	if (error.response && error.response.data && error.response.data.error) {
		throw new Error(error.response.data.error)
	} else {
		throw new Error('Network error! Please check internet connection.')
	}
}
export const addPhotoUrls =
	(photoUrls: string[]): AppThunk =>
	async (dispatch) => {
		dispatch(
			slice.actions.addPhotos({
				photoUrls: photoUrls,
			})
		)
	}
export const addThumbPhotoUrls =
	(photoUrls: string[]): AppThunk =>
	async (dispatch) => {
		dispatch(
			slice.actions.addThumbPhotos({
				photoUrls: photoUrls,
			})
		)
	}
export const getClubInfoData =
	(params: { clubid: string }, pubInfo?: boolean): AppThunk =>
	async (dispatch) => {
		var url
		if (pubInfo === undefined || pubInfo === false) {
			url = '/api/club/profile/'
		} else {
			url = '/api/club/pubprofile/'
		}
		dispatch(slice.actions.setLoadingTrue())
		try {
			const response = await axios.get(url + params.clubid)
			//console.log(response.data)
			dispatch(slice.actions.getClubInfoData({ clubInfoData: response.data }))
		} catch (err) {
			console.log(`x ${err} `)
		}
		dispatch(slice.actions.setLoadingFalse())
	}
export const uploadFiles =
	(files: File[], clubid: string): AppThunk =>
	async (dispatch, getState) => {
		//  convert to maximum  1400 size picture  and upload it to server.
		const hexHashTimestamp = Date.now().toString(32).slice(-3)
		//  add  prefix in aws s3 bucket.  Use reversed clubid to improve performance.
		var foldername = reverse(clubid) + '/'

		const uploadedUrlArray = await Promise.all(
			files.map(async (file: File, key) => {
				// rename uploaded file name
				const uploadNewname =
					'P' +
					key.toString() +
					hexHashTimestamp +
					'_' +
					file.name.replace(/[^\w-.]/gi, '_')

				const resizedResult = await resizeImageToBlob(file) // resize image if width or length is larger than 1400px
				const uploadFileOrBlob =
					typeof (resizedResult as any).name === 'string'
						? (resizedResult as Blob)
						: (resizedResult as File)
				const imageUrl = uploadOneFileOrBlob(
					uploadFileOrBlob,
					foldername,
					uploadNewname,
					file.type
				)
				return imageUrl
			})
		)
		//console.log(uploadedUrlArray)
		dispatch(addPhotoUrls(uploadedUrlArray))

		foldername = reverse(clubid) + '/thumbs/'

		const uploadedThumbUrlArray = await Promise.all(
			files.map(async (file: FileWithPreview, key) => {
				// rename uploaded file name
				// only keep words,-,. and  remove other special characters.
				const uploadNewname =
					'P' +
					key.toString() +
					hexHashTimestamp +
					'_' +
					file.name.replace(/[^\w-.]/gi, '_')
				const resizedBlob = (await getThumbImageToBlob(file)) as Blob
				//console.log('thumb blob:', resizedBlob)
				const imageUrl = uploadOneFileOrBlob(
					resizedBlob,
					foldername,
					uploadNewname,
					file.type
				)
				return imageUrl
			})
		)
		dispatch(addThumbPhotoUrls(uploadedThumbUrlArray))
		const state = getState()
		dispatch(
			updateClubInfoData({
				photoThumbUrls: state.clubInfo.clubInfoData.photoThumbUrls,
				photoUrls: state.clubInfo.clubInfoData.photoUrls,
				clubid,
			})
		)
	}

export const uploadThumbFiles =
	(files: File[], clubid: string): AppThunk =>
	async (dispatch) => {
		const hexHashTimestamp = Date.now().toString(32).slice(-3)
		//  add  prefix in aws s3 bucket.  Use reversed clubid to improve performance.
		const foldername = reverse(clubid) + '/thumbs/'

		const uploadedUrlArray = await Promise.all(
			files.map(async (file: FileWithPreview, key) => {
				// rename uploaded file name
				// only keep words,-,. and  remove other special characters.
				const uploadNewname =
					'Pthumb' +
					key.toString() +
					hexHashTimestamp +
					'_' +
					file.name.replace(/[^\w-.]/gi, '_')
				const resizedBlob = (await resizeImageToBlob(file)) as Blob
				//console.log('thumb blob:', resizedBlob)
				const imageUrl = uploadOneFileOrBlob(
					resizedBlob,
					foldername,
					uploadNewname,
					file.type
				)
				return imageUrl
			})
		)
		//console.log(uploadedUrlArray)
		dispatch(addPhotoUrls(uploadedUrlArray))
	}

export const uploadOneFileOrBlob = async (
	file: File | Blob,
	foldername: string,
	uploadNewFileName: string,
	filetype: string
) => {
	try {
		let response = await axios.get('/apiv0/postsignedurl', {
			params: {
				filename: foldername + uploadNewFileName,
				content_type: filetype,
			},
		})
		const data = response.data
		const bodyFormData = new FormData()
		bodyFormData.append('key', data.fields.key) // file name
		bodyFormData.append('bucket', data.fields.bucket)
		bodyFormData.append('X-Amz-Algorithm', data.fields['X-Amz-Algorithm'])
		bodyFormData.append('X-Amz-Date', data.fields['X-Amz-Date'])
		bodyFormData.append('Policy', data.fields['Policy'])
		bodyFormData.append('X-Amz-Credential', data.fields['X-Amz-Credential'])
		bodyFormData.append('X-Amz-Signature', data.fields['X-Amz-Signature'])
		bodyFormData.append('file', file, uploadNewFileName)

		const result = await uploadAxios({
			url: data.url,
			method: 'POST',
			data: bodyFormData,
			headers: {
				//"X-Requested-With": "XMLHttpRequest",
				'Content-Type': filetype,
				Accept: '*/*',
			},
		})
		console.log('thumb result:', result)
		// return  uploaded  file url
		return data.url + '/' + foldername + uploadNewFileName
	} catch (error) {
		return null
	}
}

export const resetClubInfo = (): AppThunk => (dispatch) => {
	dispatch(slice.actions.resetClubInfo())
}

export const deleteClub =
	(params: { clubid: string }): AppThunk =>
	async (dispatch) => {
		try {
			await axios.delete('/api/club/profile/' + params.clubid)
		} catch (err) {
			console.log('Getting user data from Kserver failed')
			dispatch(slice.actions.setLoadingFalse())
		}
	}

export const selectClubInfo = (state: RootState): ClubInfo =>
	state.clubInfo.clubInfoData
export const selectClubLoadingStatus = (state: RootState) =>
	state.clubInfo.isClubLoading
export default slice
