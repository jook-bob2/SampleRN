import React, { memo } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background: #ffffff;
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

const Background = ({ children, isFlat }) => {
	return (
		<Container>
			<ImageBackground source={require('@assets/images/background_dot.png')} resizeMode="repeat">
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						{isFlat ? (
							<FlatView>
								<Contents>{children}</Contents>
							</FlatView>
						) : (
							<ScrollView>
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
