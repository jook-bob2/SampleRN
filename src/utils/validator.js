import { utils } from '@util/regularExp'

export const emailValidator = (email) => {
	// const re = /\S+@\S+\.\S+/

	if (!email || email.length <= 0) return 'E-mail을 입력해 주세요.'
	if (!utils.regEx.email(email)) return 'E-mail 주소가 맞는지 확인해 주세요.'

	return ''
}

export const passwordValidator = (password) => {
	if (!password || password.length <= 0) return '비밀번호를 입력해 주세요.'

	return ''
}

export const nameValidator = (name) => {
	if (!name || name.length <= 0) return '이름을 입력해 주세요.'

	return ''
}
