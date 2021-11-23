// 유저 정보 초기 상태 값
export const userInitialState = {
	id: 0,
	name: '',
	email: '',
	token: '',
	isLoggined: false,
}

export const alertInitialState = {
	isOpen: false,
	title: '',
	msg: '',
}

export const confirmInitialState = {
	isOpen: false,
	title: '',
	msg: '',
	onPress: () => {},
}
