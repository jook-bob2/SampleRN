import React, { useContext, useReducer } from 'react'
import { PathHistoryStateContext } from '@store/common/create'
import { pathHistoryInitialState } from '@store/common/initialState'
import { pathHistoryReducer } from '@store/common/reducer'
import { constants } from '@store/common/constants'

const { PUSH_PATH_HISTORY, POP_PATH_HISTORY } = constants

export function PathHistoryProvider({ children }) {
	const [historyState, historyDispatch] = useReducer(pathHistoryReducer, pathHistoryInitialState)

	function pushHistory(payload) {
		historyDispatch({
			type: PUSH_PATH_HISTORY,
			payload,
		})
	}

	function popHistory() {
		historyDispatch({
			type: POP_PATH_HISTORY,
		})

		return historyState.length > 0 ? historyState[historyState.length - 2] : []
	}

	return (
		<PathHistoryStateContext.Provider value={{ historyState, historyDispatch, pushHistory, popHistory }}>
			{children}
		</PathHistoryStateContext.Provider>
	)
}
export function useHistoryPath() {
	const {
		historyState: state,
		historyDispatch: dispatch,
		pushHistory,
		popHistory,
	} = useContext(PathHistoryStateContext)
	if (!state) {
		throw new Error('Cannot find history')
	}
	return { state, dispatch, pushHistory, popHistory }
}
