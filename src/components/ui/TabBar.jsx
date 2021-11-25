import { theme } from '@/theme'
import React, { useRef } from 'react'
import { Platform, Dimensions, Animated, StyleSheet } from 'react-native'
import SmallText from './text/SmallText'
import styled from 'styled-components/native'

const Contents = styled.View`
	background-color: ${theme.colors.background};
`

const TouchableOpacity = styled.TouchableOpacity`
	${theme.common.flexCenterRow}
	background-color: ${theme.colors.aliceBlue};
	width: 100px;
	border-width: 0.5px;
	border-color: rgba(0, 0, 0, 0.2);
	border-radius: 5px;
`

const isLandscape = () => {
	const dim = Dimensions.get('screen')
	return dim.width >= dim.height
}

function tabBarHeight() {
	const defaultHeight = 20
	const majorVersion = parseInt(Platform.Version, 10)
	const isIos = Platform.OS === 'ios'
	const isIOS11 = majorVersion >= 11 && isIos
	if (Platform.isPad) return 49 + defaultHeight
	if (isIOS11 && !isLandscape()) return 49 + defaultHeight
	return 29 + defaultHeight
}

export default function TabBar({ state, descriptors, navigation }) {
	const scrollX = useRef(new Animated.Value(0)).current

	return (
		<Animated.ScrollView
			style={styles.animatedView}
			horizontal
			// pagingEnabled
			snapToOffsets={[0, 96]}
			snapToEnd={false}
			onScroll={Animated.event(
				[
					{
						nativeEvent: {
							contentOffset: {
								x: scrollX,
							},
						},
					},
				],
				{
					useNativeDriver: true,
				},
			)}
			keyboardDismissMode="interactive"
			scrollEventThrottle={16}
			directionalLockEnabled>
			{state.routes.map((route, index) => {
				const params = route.params
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({ name: route.name, merge: true })
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					})
				}

				if (params?.tabShown) {
					return (
						<Contents key={index}>
							<TouchableOpacity
								accessibilityRole="button"
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarTestID}
								onPress={onPress}
								onLongPress={onLongPress}>
								<SmallText
									style={{
										color: isFocused ? theme.colors.notification : theme.colors.text,
									}}>
									{label}
								</SmallText>
							</TouchableOpacity>
						</Contents>
					)
				}
			})}
		</Animated.ScrollView>
	)
}

const styles = StyleSheet.create({
	animatedView: {
		width: '100%',
		maxHeight: tabBarHeight(),
		backgroundColor: theme.colors.aliceBlue,
	},
})
