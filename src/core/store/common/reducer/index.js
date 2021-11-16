import { alertInitialState, confirmInitialState, userInitialState } from '../initialState'
import { constants } from '../constants'

export const alertReducer = (state, { type, title, msg }) => {
	switch (type) {
		case constants.SHOW_ALERT:
			return { ...alertInitialState, open: true, title, msg }
		case constants.CLOSE_ALERT:
			return { ...alertInitialState }
		default:
			break
	}
}

export const confirmReducer = (state, { type, title, msg }) => {
	switch (type) {
		case constants.SHOW_CONFIRM:
			return { ...confirmInitialState, open: true, title, msg }
		case constants.CLOSE_CONFIRM:
			return { ...confirmInitialState }
		default:
			break
	}
}

export const userReducer = (state, { type, payload }) => {
	switch (type) {
		case constants.SET_ADD_USER:
			return payload
		case constants.SET_INIT_USER:
			return userInitialState
		default:
			break
	}
}

export const pathHistoryReducer = (state, { type, payload }) => {
	switch (type) {
		case constants.PUSH_PATH_HISTORY:
			return [...state, payload].splice(state.length - 10)
		case constants.POP_PATH_HISTORY:
			return state.length > 0 ? state.filter((element, index) => index < state.length - 1) : []
		default:
			break
	}
}
