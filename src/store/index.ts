import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { ThunkAction } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'
import { ENABLE_REDUX_DEV_TOOLS } from 'src/constants'
import rootReducer from './rootReducer'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		if (ENABLE_REDUX_DEV_TOOLS) {
			return getDefaultMiddleware().concat(logger)
		} else {
			return getDefaultMiddleware()
		}
	},
	devTools: ENABLE_REDUX_DEV_TOOLS,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const useDispatch = () => useReduxDispatch<AppDispatch>()

export default store
