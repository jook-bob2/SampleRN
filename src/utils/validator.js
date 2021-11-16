import { utils } from '@util/regularExp'

// 이메일 검증
export const emailValidator = (email) => {
	// const re = /\S+@\S+\.\S+/

	if (!email || email.length <= 0) return 'E-mail을 입력해 주세요.'
	if (!utils.regEx.email(email)) return 'E-mail 주소가 맞는지 확인해 주세요.'

	return ''
}

// 비밀번호 검증
export const passwordValidator = (password) => {
	if (!password || password.length <= 0) return '비밀번호를 입력해 주세요.'
	if (!utils.regEx.password(password)) return '비밀번호를 형식에 맞게 입력해 주세요.'

	return ''
}

// 비밀번호 확인 검증
export const passwordCheckValidator = (password, passwordCheck) => {
	if (!passwordCheck || passwordCheck.length <= 0) return '비밀번호 학인란을 입력해 주세요.'
	if (password !== passwordCheck) return '비밀번호가 일치하지 않습니다.'

	return ''
}

// 이름 검증
export const nameValidator = (name) => {
	if (!name || name.length <= 0) return '이름을 입력해 주세요.'

	return ''
}
