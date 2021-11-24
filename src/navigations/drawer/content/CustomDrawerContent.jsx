import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import auth from '@react-native-firebase/auth'
import styled from 'styled-components/native'
import { useUser } from '@/core/store/common/providers/UserProvider'
import { theme } from '@/theme'

const ImageBackground = styled.ImageBackground`
	flex: 1;
	width: 100%;
`

const ProfileView = styled.View`
	${theme.common.flexCenterColumn}
	padding: 20px;
`

const NameText = styled.Text`
	font-size: 20px;
	font-family: ${theme.fonts.notoSans.bold};
`

const ImageView = styled.View`
	align-self: center;
	justify-content: center;
	padding: 30px 0px 10px 0px;
`

const Image = styled.Image`
	width: 130px;
	height: 130px;
	border-radius: 65.5px;
`

const LineView = styled.View`
	border: solid 1px gray;
`

const DrawerItemView = styled.View`
	top: 10px;
`

const Icon = styled.Image`
	width: 30px;
	height: 30px;
`

const labelStyle = { fontSize: 18, color: `${theme.colors.onSurface}`, fontFamily: `${theme.fonts.notoSans.bold}` }

export default function CustomDrawerContent(props) {
	const { navigate, closeDrawer } = props?.navigation
	const {
		userState: { name },
	} = useUser()

	const { initUserInfo } = useUser()

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
		<ImageBackground
			source={require('@assets/images/background.jpeg')}
			resizeMode="stretch"
			imageStyle={{ opacity: 0.3 }}>
			<DrawerContentScrollView {...props}>
				{name && (
					<ProfileView>
						<NameText>{name}</NameText>
						<ImageView>
							<Image source={require('@assets/images/karina.jpeg')} />
						</ImageView>
					</ProfileView>
				)}

				<LineView />

				<DrawerItemView>
					<DrawerItem
						label="메인"
						icon={() => <Icon source={require('@assets/icons/home.png')} />}
						labelStyle={labelStyle}
						onPress={() => navigate('MainScreen')}
					/>
					<DrawerItem
						label="프로필"
						labelStyle={labelStyle}
						icon={() => <Icon source={require('@assets/icons/profile.png')} />}
						onPress={() => navigate('MyProfileScreen')}
					/>
					<DrawerItem
						label="박스오피스"
						labelStyle={labelStyle}
						icon={() => <Icon source={require('@assets/icons/movie.png')} />}
						onPress={() => navigate('MovieDrawerFlow', { screen: 'BoxOfficeListScreen' })}
					/>
					<DrawerItem
						label="탭 플로우 이동"
						labelStyle={labelStyle}
						icon={() => <Icon source={require('@assets/icons/flow.png')} />}
						onPress={() => navigate('MainTabFlow', { screen: 'MainScreen' })}
					/>
					<DrawerItem
						label="로그아웃"
						labelStyle={labelStyle}
						icon={() => <Icon source={require('@assets/icons/signout.png')} />}
						onPress={handlePressLogout}
					/>
				</DrawerItemView>
			</DrawerContentScrollView>
		</ImageBackground>
	)
}
