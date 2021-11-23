import { alertInitialState, confirmInitialState, userInitialState } from '../initialState'
import { constants } from '../constants'

export const alertReducer = (state, { type, title, msg }) => {
	switch (type) {
		case constants.SET_OPEN_ALERT:
			return { ...alertInitialState, isOpen: true, title, msg }
		case constants.SET_CLOSE_ALERT:
			return { ...alertInitialState }
		default:
			break
	}
}

export const confirmReducer = (state, { type, title, msg, onPress }) => {
	switch (type) {
		case constants.SET_OPEN_CONFIRM:
			return { ...confirmInitialState, isOpen: true, title, msg, onPress }
		case constants.SET_CLOSE_CONFIRM:
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
