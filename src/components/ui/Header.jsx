import React, { memo, useEffect } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'
import { theme } from '@theme/theme'
import { useHistoryPath } from '@/core/store/common/providers/PathHistoryProvider'

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

const Header = (props) => {
	const { options, navigation, route } = props
	const { state: history, pushHistory, popHistory } = useHistoryPath()

	const title =
		options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : null

	useEffect(() => {
		pushHistory({
			index: history.length > 0 ? history[history.length - 1].index + 1 : 1,
			screen: route.name,
			params: route.params || {},
		})
	}, [route])

	function handlePressToggle() {
		if (options.isBack) {
			const { screen, params } = popHistory()
			if (screen) {
				navigation.navigate(screen, params)
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
