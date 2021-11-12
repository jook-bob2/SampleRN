import React, { memo } from 'react'
import styled from 'styled-components/native'

const Image = styled.Image`
	width: 128px;
	height: 128px;
	margin-bottom: 12px;
`

const Logo = () => <Image source={require('@assets/images/logo.png')} />

export default memo(Logo)
