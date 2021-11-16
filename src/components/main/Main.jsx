import React from 'react'
import { View, Text } from 'react-native'
import { useUser } from '@/core/store/common/providers/UserProvider'

export default function Main() {
	const { userState } = useUser()

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
