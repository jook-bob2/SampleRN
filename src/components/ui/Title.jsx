import React, { memo } from 'react'
import { theme } from '@/theme'
import styled from 'styled-components/native'

const Text = styled.Text`
	font-size: 26px;
	color: ${theme.colors.primary};
	padding-vertical: 14px;
	font-family: ${theme.fonts.notoSans.bold};
`

const Title = ({ children }) => <Text>{children}</Text>

export default memo(Title)
