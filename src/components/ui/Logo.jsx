import React, { memo } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
	padding-top: 20px;
`

const Image = styled.Image`
	width: ${(props) => props.width || 128}px;
	height: ${(props) => props.height || 128}px;
	margin-bottom: ${(props) => props.bottom || 12}px;
`

const Logo = ({ source }) => {
	return (
		<Container>
			<Image source={source} />
		</Container>
	)
}

export default memo(Logo)
