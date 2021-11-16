import React, { memo, useCallback, useContext } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'
import { theme } from '@theme/theme'
import { useFocusEffect, useRoute } from '@react-navigation/core'
import { useHistoryPath } from '@/core/store/common/providers/PathHistoryProvider'
import { PathHistoryStateContext } from '@/core/store/common/create'

const Wrapper = styled.View`
	flex-direction: row;
	align-self: center;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: ${theme.colors.surface};
	margin-top: ${getStatusBarHeight()}px;
	padding: 20px 20px;
`

const Left = styled.View`
	align-items: flex-start;
`

const Center = styled.View`
	align-items: center;
`

const Right = styled.View`
	align-items: flex-end;
`

const TouchableOpacity = styled.TouchableOpacity`
	position: relative;
`

const Image = styled.Image`
	width: 35px;
	height: 35px;
	border-radius: 20.5px;
`

const Text = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: black;
`

const Header = ({ options, navigation, isBack }) => {
	// console.log('{옵션 ==> } ==> ', options)
	// scene =>  {"layout": {"height": 844, "width": 390, "x": 0, "y": 0},
	// "navigation":
	// {"addListener": [Function addListener],
	// "canGoBack": [Function canGoBack],
	// "closeDrawer": [Function anonymous],
	// "dispatch": [Function dispatch],
	// "getParent": [Function getParent],
	// "getState": [Function anonymous],
	// "goBack": [Function anonymous],
	// "isFocused": [Function isFocused],
	// "jumpTo": [Function anonymous],
	// "navigate": [Function anonymous],
	// "openDrawer": [Function anonymous],
	// "pop": [Function anonymous],
	// "popToTop": [Function anonymous],
	// "push": [Function anonymous],
	// "removeListener": [Function removeListener],
	// "replace": [Function anonymous],
	// "reset": [Function anonymous],
	// "setOptions": [Function setOptions],
	// "setParams": [Function anonymous],
	// "toggleDrawer": [Function anonymous]},
	// "options": {"header": [Function header], "title": "메인"},
	// "route": {"key": "MainScreen-BJ1IW3SUhoKaqbdwCADY4", "name": "MainScreen", "params": undefined}}

	// const navigation = useNavigation()
	const route = useRoute()
	console.log('겟 라우트 => ', route)
	// const { state: history, pushHistory, popHistory } = useHistoryPath()
	const { pushHistory, popHistory } = useContext(PathHistoryStateContext)

	useFocusEffect(
		useCallback(() => {
			console.log('==============================================포커스 됨=======================')
			pushHistory({ flow: route.name, screen: route.params.screen, params: route.params.params })
		}, [route]),
	)

	const title =
		options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : null

	function handlePressToggle() {
		console.log(navigation.canGoBack())
		if (isBack) {
			console.log(popHistory(route.params.screen))
			// navigation.goBack(null)
			// navigation.
		} else {
			navigation.toggleDrawer()
		}
	}

	return (
		<Wrapper>
			{navigation && (
				<Left>
					<TouchableOpacity onPress={handlePressToggle}>
						<Image
							source={
								isBack
									? require('@assets/images/arrow_back.png')
									: require('@assets/images/hamburg.png')
							}
						/>
					</TouchableOpacity>
				</Left>
			)}
			<Center>
				<Text>{title}</Text>
			</Center>
			<Right>
				<Text>{'Right'}</Text>
			</Right>
		</Wrapper>
	)
}

export default memo(Header)
