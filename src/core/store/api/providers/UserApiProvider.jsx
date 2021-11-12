import React from 'react'
import { userReducer } from '../reducer/userReducer'
import { initialAsyncState } from '../utils/initialAsyncState'
import { UserContext } from '../create/userCreate'
import { useContext, useReducer } from 'react'

// UsersContext 에서 사용 할 기본 상태
const initialState = {
	userLogin: initialAsyncState,
}

export function UserApiProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialState)

	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export function useUserContext() {
	const { state, dispatch } = useContext(UserContext)
	if (!state) {
		throw new Error('Cannot find UserState')
	}
	return { state, dispatch }
}
