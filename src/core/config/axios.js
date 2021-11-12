import axios from 'axios'
import { API_URL } from '../../../env.json'

/*
 * axios 인터셉터 설정
 */
function setInterceptors(instance) {
	instance.interceptors.request.use(
		(config) => {
			if (config.authentication) {
				const { Authorization: accessToken } = config.headers

				if (!accessToken) {
					// 토큰이 없는 경우
					config.code = 403
					config.msg = 'Forbidden has occurred.'
					return Promise.reject({ config })
				}
			}

			return config
		},
		(error) => {
			return Promise.reject(error)
		},
	)
	instance.interceptors.response.use(
		(response) => {
			return response.data
		},
		(error) => {
			const { response, config } = error
			if (response) {
				// 서버 오류일 경우
				// 아래와 같은 데이터가 반환 된다.
				// config: {url: "/user/login", method: "post", data: "{\"email\":\"sha256@naver.com\",\"passwd\":\"asdf1414!\"}", headers: {…}, baseURL: "http://localhost:8080", …}
				// data: {success: false, code: "ESVC005", msg: "토큰 정보가 없거나 유효하지 않습니다."}
				// headers: {content-type: "application/json"}
				// request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
				// status: 401
				// statusText: ""
				if (response.data) {
					const { code, msg, status, error } = response.data
					if (code && msg) {
						return Promise.reject({ success: false, code, msg })
					}
					if (status && error && status === 404) {
						return Promise.reject({ success: false, code: status, msg: error })
					}
				} else if (response.status === 400) {
					return Promise.reject({ success: false, code: response.status, msg: 'Bad request' })
				}
			} else if (config && config.code && config.msg) {
				// config 오류일 경우
				// 아래와 같은 데이터가 반환 된다.
				// adapter: ƒ xhrAdapter(config)
				// authentication: false
				// baseURL: "http://localhost:8080"
				// code: 403
				// data: {email: "sha256@naver.com", passwd: "asdf1414!"}
				// headers: {common: {…}, delete: {…}, get: {…}, head: {…}, post: {…}, …}
				// maxBodyLength: -1
				// maxContentLength: -1
				// method: "post"
				// msg: "Forbidden has occurred."
				// params: {lang: "ko"}
				// timeout: 0
				// transformRequest: [ƒ]
				// transformResponse: [ƒ]
				// url: "/user/login"
				// validateStatus: ƒ validateStatus(status)
				// xsrfCookieName: "XSRF-TOKEN"
				// xsrfHeaderName: "X-XSRF-TOKEN"
				const { code, msg } = config
				return Promise.reject({ success: false, code, msg })
			}

			// 알 수 없는 오류일 경우
			return Promise.reject({ success: false, code: 40999, msg: 'An unknown error has occurred.' })
		},
	)
	return instance
}

// 권한 axios
function authCreate(url, options) {
	const instance = axios.create(Object.assign({ baseURL: url }, options))
	setInterceptors(instance)
	return instance
}

// 비권한 axios
function noneAuthCreate(url, options) {
	const instance = axios.create(Object.assign({ baseURL: url }, options))
	setInterceptors(instance)
	return instance
}

// 권한 여부에 따른 axios 헤더 셋팅
export function setAxiosHeader(key, value, auth = true) {
	// 권한이 있는 경우 모두 셋팅
	authClient.defaults.headers[key] = value
	// 권한이 없는 경우에만 셋팅
	if (!auth) noneAuthClient.defaults.headers[key] = value
}

// 토큰 검증 할 때 사용
export const authClient = authCreate(API_URL, { authentication: true })

// 토큰 검증 안 할 때 사용
export const noneAuthClient = noneAuthCreate(API_URL, { authentication: false })
