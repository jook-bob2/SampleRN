import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import auth from '@react-native-firebase/auth'
import { UserStateContext } from '@/core/store/common/create'
import styled from 'styled-components/native'

const ProfileView = styled.View`
	flex: 1;
	align-content: center;
	justify-content: center;
	padding: 20px;
`

const Text = styled.Text`
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`

export default function CustomDrawerContent(props) {
	const { getState, navigate, closeDrawer } = props?.navigation
	const flowName = getState()?.routes[0]?.name
	console.log('flowName ==> ', flowName)
	const { initUserInfo } = useContext(UserStateContext)

	function handlePressLogout() {
		auth()
			.signOut()
			.then(() => {
				console.log('로그아웃 되었습니다.')
				initUserInfo()
				closeDrawer()
				navigate('SignInScreen')
			})
			.catch((err) => console.log(err))
	}

	return (
		<DrawerContentScrollView {...props}>
			{flowName && (
				<ProfileView>
					<Text>{flowName}</Text>
				</ProfileView>
			)}
			{/* <DrawerItemList {...props} /> */}
			<DrawerItem label="홈" onPress={() => navigate('MainScreen')} />
			<DrawerItem label="프로필" onPress={() => navigate('MyProfileScreen')} />
			<DrawerItem label="박스오피스" onPress={() => navigate('BoxOfficeListScreen')} />
			<DrawerItem label="로그아웃" onPress={handlePressLogout} />
		</DrawerContentScrollView>
	)
}
