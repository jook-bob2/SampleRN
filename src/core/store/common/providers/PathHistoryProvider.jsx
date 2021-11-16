import React, { useContext, useReducer } from 'react'
import { PathHistoryStateContext } from '@store/common/create'
import { pathHistoryInitialState } from '@store/common/initialState'
import { pathHistoryReducer } from '@store/common/reducer'
import { constants } from '@store/common/constants'

const { PUSH_PATH_HISTORY, POP_PATH_HISTORY } = constants

export function PathHistoryProvider({ children }) {
	const [historyState, historyDispatch] = useReducer(pathHistoryReducer, pathHistoryInitialState)
	console.log('뭐지? ', historyState)

	function pushHistory(payload) {
		console.log('fsdafdasfdsaf =>', historyState)
		console.log('data ==> ', payload)
		historyDispatch({
			type: PUSH_PATH_HISTORY,
			payload,
		})
	}

	function popHistory(payload) {
		historyDispatch({
			type: POP_PATH_HISTORY,
			payload,
		})

		return historyState
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
	// if (!state) {
	// 	throw new Error('Cannot find history')
	// }
	return { state, dispatch, pushHistory, popHistory }
}
