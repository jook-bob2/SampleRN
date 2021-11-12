import { authClient, noneAuthClient } from '@core/config/axios'

export async function getUserInfo({ id }) {
	return await authClient.get(`/user/info/${id}`)
}

export async function postUserLogin(loginData) {
	return await noneAuthClient.post('/user/login', loginData)
}
