import useSWR, { mutate } from 'swr'
import { API_URL } from '../../../env.json'

export default function useFetch(params = {}, fetcher) {
	return useSWR(`${API_URL}?${getQueryString(params)}`, () => fetcher(params))
}

export const preFetch = (params = {}, fetcher) => {
	const uri = `${API_URL}?${getQueryString(params)}`
	return mutate(uri, fetcher(params))
}

function getQueryString(params) {
	const qs = []
	for (const key in params) {
		qs.push(`${key}=${params[key]}`)
	}

	return qs.join('&')
}
