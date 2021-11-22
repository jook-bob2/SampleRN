import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core'
import React, { memo, useState, useCallback, useEffect } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback, RefreshControl, ToastAndroid, BackHandler } from 'react-native'
import styled from 'styled-components/native'
import { CommonActions } from '@react-navigation/routers'
import { theme } from '@/theme'

const Container = styled.SafeAreaView`
	${theme.common.flexCenterRow}
`

const ImageBackground = styled.ImageBackground`
	flex: 1;
	width: 100%;
`

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	width: 100%;
	align-self: center;
	align-items: center;
	justify-content: center;
`

const ScrollView = styled.ScrollView`
	width: 100%;
	text-align: center;
`

const FlatView = styled.View``

const Contents = styled.View``

const Background = ({ children, options = { isFlat: false } }) => {
	const [refreshing, setRefreshing] = useState(false)
	const { goBack, getState, dispatch } = useNavigation()
	const route = useRoute()
	let exitApp = false

	function refresh() {
		dispatch(
			CommonActions.navigate({
				name: route.name,
				params: route.params,
			}),
		)
	}

	const wait = (timeout) => {
		return new Promise((resolve) =>
			setTimeout(() => {
				refresh()
				resolve()
			}, timeout),
		)
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		wait(0).then(() => setRefreshing(false))
	}, [])

	useEffect(() => {
		return () => {
			exitApp = false
			BackHandler.removeEventListener('hardwareBackPress', () =>
				handleBackButton({ routeName: route.name, exitAppCopy: exitApp }),
			)
		}
	}, [])

	useFocusEffect(
		useCallback(() => {
			let naviHistory = getState().history
			let rName = ''

			if (naviHistory && naviHistory.length > 0) {
				rName = naviHistory[naviHistory.length - 1].key.split('-')[0]
			}

			BackHandler.addEventListener('hardwareBackPress', () =>
				handleBackButton({ routeName: rName || route.name, exitAppCopy: exitApp }),
			)
		}, [route]),
	)

	function handleBackButton({ routeName, exitAppCopy }) {
		if (Platform.OS === 'android') {
			if (routeName === 'MainScreen' || routeName === 'SignInScreen') {
				let timeout
				// 2초안에 back 키를 한번 더 누를 경우 앱 종료
				if (!exitAppCopy) {
					ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT)
					exitApp = true

					timeout = setTimeout(() => {
						exitApp = false
					}, 2000)

					return true
				} else if (exitAppCopy) {
					clearTimeout(timeout)
					BackHandler.exitApp()
					return true
				}
			} else {
				goBack()
				return true
			}
		}
		return false
	}

	return (
		<Container>
			<ImageBackground
				source={require('@assets/images/background.jpeg')}
				resizeMode="stretch"
				imageStyle={{ opacity: 0.2 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						{options.isFlat ? (
							<FlatView>
								<Contents>{children}</Contents>
							</FlatView>
						) : (
							<ScrollView
								refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
								<Contents>{children}</Contents>
							</ScrollView>
						)}
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</Container>
	)
}

export default memo(Background)
