import React, { memo } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'
import { theme } from '@/theme'
import { Platform } from 'react-native'
import { CommonActions } from '@react-navigation/routers'
import Center from './view/Center'
import Left from './view/Left'
import Right from './view/Right'
import Subtitle from './text/Subtitle'

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

const TouchableOpacity = styled.TouchableOpacity`
	/* position: relative; */
`

const Image = styled.Image`
	width: 35px;
	height: 35px;
	border-radius: 10px;
	background-color: white;
`

const Header = ({ options, navigation, route }) => {
	const title =
		options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : null

	function handlePressToggle() {
		if (options.isBack) {
			navigation.goBack()
		} else {
			navigation.toggleDrawer()
		}
	}

	function refresh() {
		navigation.dispatch(
			CommonActions.navigate({
				name: route.name,
				params: route.params,
			}),
		)
	}

	return (
		<Wrapper>
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
			<Center>
				<Subtitle>{title}</Subtitle>
			</Center>
			<Right>
				<TouchableOpacity onPress={() => refresh()}>
					<Image source={require('@assets/icons/reload.png')} />
				</TouchableOpacity>
			</Right>
		</Wrapper>
	)
}

export default memo(Header)
