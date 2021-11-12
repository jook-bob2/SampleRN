import { alertInitialState, confirmInitialState, queryInitialState, userInitialState } from '../initialState'
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

export const langReducer = (state, { type, lang, langText }) => {
	switch (type) {
		case constants.SET_LANG:
			return { lang, langText }
		default:
			break
	}
}

export const hostingCntReducer = (state, { type, hostingCnt }) => {
	switch (type) {
		case constants.SET_HOSTING_CNT:
			return { hostingCnt }
		default:
			break
	}
}

export const pathHistoryReducer = (state, { type, prevPath, curPath }) => {
	switch (type) {
		case constants.SET_PATH_HISTORY:
			return { prevPath, curPath }
		default:
			break
	}
}

export const queryReducer = (state, { type, payload }) => {
	switch (type) {
		case constants.SET_NORMAL_QUERY:
			return payload
		case constants.INIT_NORMAL_QUERY:
			return queryInitialState
		default:
			break
	}
}
