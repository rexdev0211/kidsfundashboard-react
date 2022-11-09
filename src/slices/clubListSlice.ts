import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from 'src/store'
import axios from 'src/utils/axios'
import type { ClubInfo, ClublistApiResponse } from 'src/types/clubinfo'

import type { RootState } from 'src/store'
import type { QueryState } from 'src/types/querystate'
import store from 'src/store'

interface clubListType {
	clubs: ClubInfo[] // returned search result, a list of clubs.
	totalDocCount: number
}

interface clubListState {
	clubList: clubListType
	newclubs: ClubInfo[]
	isLoading: boolean
	query: QueryState // query conditons used in fetch
}
interface queryParams {
	pageSize: number
	pageNum: number
}
const initialState: clubListState = {
	clubList: { clubs: [], totalDocCount: 0 },
	newclubs: [],
	isLoading: false,
	query: { clubCategories: [] },
}

/*  copied from querystate file
interface QueryState {
	clubCategories?: Array<String>
	sportsCate?: Array<String>
	artCate?: Array<String>
	stemCate?: Array<String>
	moreCate?: Array<String>
	text?: string // key word text search in mongoDB database
	city?: string
	state?: string
	country?: string
	zipcode?: string
} */

const slice = createSlice({
	name: 'clublist',
	initialState,
	reducers: {
		fetchClubs(
			state: clubListState,
			action: PayloadAction<ClublistApiResponse>
		) {
			const { clubdocs, totalDocCount } = action.payload

			state.clubList = { clubs: clubdocs, totalDocCount }
		},
		fetchNewclubs(
			state: clubListState,
			action: PayloadAction<ClublistApiResponse>
		) {
			const { clubdocs } = action.payload

			state.newclubs = clubdocs
		},
		setLoadingTrue(state: clubListState) {
			state.isLoading = true
		},
		setLoadingFalse(state: clubListState) {
			state.isLoading = false
		},
		setQuery(
			state: clubListState,
			action: PayloadAction<{ query: QueryState }>
		) {
			const { query } = action.payload
			state.query = { ...state.query, ...query }
		},
		incClubRecom(
			state: clubListState,
			action: PayloadAction<{ clubid: string }>
		) {
			const { clubid } = action.payload
			const newlist: ClubInfo[] = state.clubList.clubs.map((club, i) =>
				club.clubid === clubid
					? { ...club, ...{ recommendations: club.recommendations + 1 } }
					: { ...club }
			)
			state.clubList = {
				clubs: newlist,
				totalDocCount: state.clubList.totalDocCount,
			}
		},
		decClubRecom(
			state: clubListState,
			action: PayloadAction<{ clubid: string }>
		) {
			const { clubid } = action.payload
			const newlist: ClubInfo[] = state.clubList.clubs.map((club, i) =>
				club.clubid === clubid
					? { ...club, ...{ recommendations: club.recommendations - 1 } }
					: { ...club }
			)
			state.clubList = {
				clubs: newlist,
				totalDocCount: state.clubList.totalDocCount,
			}
		},
	},
})

export const reducer = slice.reducer

export const fetchClubs =
	(query: queryParams, publist?: boolean): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(slice.actions.setLoadingTrue())
			const curstate = store.getState()
			const limit = query.pageSize
			const skip = limit * (query.pageNum - 1)

			const city = curstate.clublist.query.city
			const text = curstate.clublist.query.text
			var country = curstate.clublist.query.country
			const state = curstate.clublist.query.state
			const params = {
				limit,
				skip,
				city,
				state,
				country,
				text,
				categories: store.getState().clublist.query.clubCategories,
			}
			if (params.state === undefined) {
				delete params.state
			}
			var url = ''
			if (publist) {
				url = '/api/club/publist/'
			} else {
				url = '/api/club/list/'
			}
			const response = await axios.get<ClublistApiResponse>(url, {
				params,
			})
			//console.log('params:', params)
			// use dispatch to update submit status
			//console.log(response.data)
			dispatch(slice.actions.fetchClubs(response.data))
			dispatch(slice.actions.setLoadingFalse())
			return response.status
		} catch (err) {
			dispatch(slice.actions.setLoadingFalse())
			console.log(`x ${err} `)
		}
	}

export const setQuery = (query: QueryState) => (dispatch) => {
	try {
		//console.log('query:', query)
		dispatch(slice.actions.setQuery({ query }))
	} catch (err) {
		console.log(err)
	}
}
export const getNewclubs =
	(query: queryParams, publist?: boolean): AppThunk =>
	async (dispatch) => {
		if (process.env.NODE_ENV !== 'production') {
			console.log('getNewclubs!')
		}
		try {
			dispatch(slice.actions.setLoadingTrue())
			const curstate = store.getState()
			const limit = query.pageSize
			const skip = limit * (query.pageNum - 1)
			const city = curstate.clublist.query.city
			var country = curstate.clublist.query.country
			const state = curstate.clublist.query.state
			const params = { limit, skip, city, state, country }
			const response = await axios.get<ClublistApiResponse>(
				'/api/club/newclubs',

				{ params }
			)
			//console.log('params:', params)
			// use dispatch to update submit status
			//console.log(response.data)
			dispatch(slice.actions.fetchNewclubs(response.data))
			dispatch(slice.actions.setLoadingFalse())
			return response.status
		} catch (err) {
			dispatch(slice.actions.setLoadingFalse())
			console.log(`x ${err} `)
		}
	}

export const incClubRecom =
	(params: { clubid: string }): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post(
				'/api/club/pubprofile/' + params.clubid + '/recom',
				{ recom: true }
			)
			dispatch(slice.actions.incClubRecom({ clubid: params.clubid }))
			// use dispatch to update submit status
			return response.status
		} catch (error) {
			console.log(error)
			//checkErrorForDisplay(error)
		}
	}
export const decClubRecom =
	(params: { clubid: string }): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post(
				'/api/club/pubprofile/' + params.clubid + '/recom',
				{ recom: false }
			)
			dispatch(slice.actions.decClubRecom({ clubid: params.clubid }))
			// use dispatch to update submit status
			return response.status
		} catch (error) {
			console.log(error)
			//checkErrorForDisplay(error)
		}
	}
export const selectQuery = (state: RootState): QueryState =>
	state.clublist.query
export const selectClubs = (state: RootState): clubListType =>
	state.clublist.clubList
export const selectNewclubs = (state: RootState): [ClubInfo] =>
	state.clublist.newclubs
export const selectClubListLoadingStatus = (state: RootState): boolean =>
	state.clublist.isLoading
export default slice
