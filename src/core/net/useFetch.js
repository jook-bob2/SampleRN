import axios from 'axios'
import useSWR, { mutate } from 'swr'
// import { API_URL } from '../../../env.json'
// import { authClient, noneAuthClient } from '../config/axios'

export const fetcher = (url) => {
	return axios.get(url).then((response) => response.data)
}

export default function useFetch(url, params = {}) {
	return useSWR(`${url}?${getQueryString(params)}`, fetcher)
}

export const preFetch = (url, params = {}) => {
	const uri = `${url}?${getQueryString(params)}`
	return mutate(uri, fetcher(uri))
}

// function useUser(id) {
// 	const { data, error } = useFetch('/api/user', current)

// 	return {
// 		user: data,
// 		isLoading: !error && !data,
// 		isError: error,
// 	}
// }

function getQueryString(params) {
	const qs = []
	for (const key in params) {
		qs.push(`${key}=${params[key]}`)
	}

	return qs.join('&')
}
