export const initialAsyncState = {
	loading: false,
	data: null,
	error: null,
}

export const initialResponse = {
	success: false,
	code: '',
	msg: '',
}

export const initialListState = {
	...initialResponse,
	data: { totalElements: 0, totalPages: 0, size: 10, content: [] },
}

export const initialListState2 = {
	...initialResponse,
	data: { code: 'SUCCESS', data: [], msg: '', success: true },
}
