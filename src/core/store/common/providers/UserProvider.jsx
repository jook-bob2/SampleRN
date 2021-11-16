import React, { useContext, useReducer } from 'react'
import { UserStateContext } from '@store/common/create'
import { userInitialState } from '@store/common/initialState'
import { userReducer } from '@store/common/reducer'
import { constants } from '@store/common/constants'

const { SET_ADD_USER, SET_INIT_USER } = constants

export function UserProvider({ children }) {
	const [userState, userDispatch] = useReducer(userReducer, userInitialState)

	function setUserInfo(payload) {
		userDispatch({
			type: SET_ADD_USER,
			payload: { ...payload, isLoggined: true },
		})
	}

	function initUserInfo() {
		// 회원정보 초기화
		userDispatch({
			type: SET_INIT_USER,
		})
	}

	return (
		<UserStateContext.Provider value={{ userState, userDispatch, setUserInfo, initUserInfo }}>
			{children}
		</UserStateContext.Provider>
	)
}

export function useUser() {
	const { userState, userDispatch, setUserInfo, initUserInfo } = useContext(UserStateContext)
	if (!userState) {
		throw new Error('Cannot find UserState')
	}
	return { userState, userDispatch, setUserInfo, initUserInfo }
}
