import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { UserStateContext } from '@/core/store/common/create'

export default function Main() {
	const { userState } = useContext(UserStateContext)

	return (
		<View>
			<Text>메인 스크린</Text>
			<View>
				<Text>토큰 : {userState.token}</Text>
				<Text>이름 : {userState.name}</Text>
				<Text>이메일 : {userState.email}</Text>
			</View>
		</View>
	)
}
