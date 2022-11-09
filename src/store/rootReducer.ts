import { combineReducers } from '@reduxjs/toolkit'
import { reducer as notificationReducer } from 'src/slices/notification'
import { reducer as clubInfoReducer } from 'src/slices/clubinfoSlice'
import { reducer as userReducer } from 'src/slices/userprofileSlice'
import { reducer as clubListReducer } from 'src/slices/clubListSlice'
import { reducer as calendarReducer } from 'src/slices/calendarSlice'
const combinedReducer = combineReducers({
	notifications: notificationReducer,
	clubInfo: clubInfoReducer,
	user: userReducer,
	clublist: clubListReducer,
	calendar: calendarReducer,
})

const rootReducer = (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		// check for action type
		state = undefined
	}
	return combinedReducer(state, action)
}

export default rootReducer
