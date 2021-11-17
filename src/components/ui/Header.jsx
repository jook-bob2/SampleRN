import React, { memo, useCallback } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'
import { theme } from '@/theme'
import { useHistoryPath } from '@/core/store/common/providers/PathHistoryProvider'
import { useFocusEffect } from '@react-navigation/core'
import { Platform } from 'react-native'

const Wrapper = styled.View`
	flex-direction: row;
	align-self: center;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: ${theme.colors.header};
	margin-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
	padding: 10px 20px;
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
	border-radius: 10px;
	background-color: white;
`

const Text = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: ${theme.colors.surface};
`

const Header = ({ options, navigation, route }) => {
	const { state: history, pushHistory, popHistory } = useHistoryPath()

	const title =
		options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : null

	useFocusEffect(
		useCallback(() => {
			pushHistory({
				index: history.length > 0 ? history[history.length - 1].index + 1 : 1,
				screen: route.name,
				params: route.params || {},
			})
		}, [route]),
	)

	function handlePressToggle() {
		if (options.isBack) {
			if (history.length > 0) {
				const { screen, params } = popHistory()
				if (screen) {
					navigation.navigate(screen, params)
				}
			}
		} else {
			navigation.toggleDrawer()
		}
	}

	return (
		<Wrapper>
			{navigation && (
				<Left>
					<TouchableOpacity onPress={() => handlePressToggle()}>
						<Image
							source={
								options.isBack
									? require('@assets/icons/arrow_back.png')
									: require('@assets/icons/hamburg.png')
							}
						/>
					</TouchableOpacity>
				</Left>
			)}
			<Center>
				<Text>{title}</Text>
			</Center>
			<Right>
				<TouchableOpacity onPress={() => {}}>
					<Image source={require('@assets/icons/reload.png')} />
				</TouchableOpacity>
			</Right>
		</Wrapper>
	)
}

export default memo(Header)
