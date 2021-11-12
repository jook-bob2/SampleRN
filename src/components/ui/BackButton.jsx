import React, { memo } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'

const TouchableOpacity = styled.TouchableOpacity`
	position: absolute;
	top: ${getStatusBarHeight()};
	left: 0;
`

const Image = styled.Image`
	width: 24px;
	height: 24px;
`

const BackButton = ({ goBack }) => (
	<TouchableOpacity onPress={goBack}>
		<Image source={require('@assets/images/arrow_back.png')} />
	</TouchableOpacity>
)

export default memo(BackButton)
