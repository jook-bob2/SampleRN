import React, { memo, useState } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback, RefreshControl } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
`

const ImageBackground = styled.ImageBackground`
	flex: 1;
	width: 100%;
`

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	width: 100%;
	align-self: center;
	align-items: center;
	justify-content: center;
`

const ScrollView = styled.ScrollView`
	flex: 1;
	width: 100%;
	text-align: center;
`

const FlatView = styled.View`
	flex: 1;
`

const Contents = styled.View`
	width: 100%;
	padding: 10px;
`

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}

const Background = ({ children, isFlat }) => {
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		wait(1000).then(() => setRefreshing(false))
	}, [])

	return (
		<Container>
			<ImageBackground
				source={require('@assets/images/background.jpeg')}
				resizeMode="stretch"
				imageStyle={{ opacity: 0.2 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						{isFlat ? (
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
