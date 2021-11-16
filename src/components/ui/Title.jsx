import React, { memo } from 'react'
import { theme } from '@theme/theme'
import styled from 'styled-components/native'

const Text = styled.Text`
	font-size: 26px;
	color: ${theme.colors.primary};
	font-weight: bold;
	padding-vertical: 14px;
`

const Title = ({ children }) => <Text>{children}</Text>

export default memo(Title)
