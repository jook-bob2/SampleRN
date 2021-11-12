import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { UserStateContext } from '@/core/store/common/create'

export default function MainContainer() {
	const { userState, initUserInfo } = useContext(UserStateContext)
	const { navigate } = useNavigation()

	function handlePressLogout() {
		auth()
			.signOut()
			.then(() => {
				console.log('로그아웃 되었습니다.')
				initUserInfo()
				navigate('SignIn')
			})
			.catch((err) => console.log(err))
	}

	return (
		<View>
			<Text>메인 스크린</Text>
			<Button title="로그아웃" onPress={() => handlePressLogout()} />
			<View>
				<Text>토큰 : {userState.token}</Text>
				<Text>이름 : {userState.name}</Text>
				<Text>이메일 : {userState.email}</Text>
			</View>
		</View>
	)
}
