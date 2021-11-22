import React, { memo } from 'react'
import { theme } from '@/theme'
import styled from 'styled-components/native'

const Text = styled.Text`
	font-size: ${theme.fonts.size.title}px;
	color: ${({ style }) => style?.color || theme.colors.primary};
	font-family: ${({ style }) => style?.fontFamily || theme.fonts.notoSans.bold};
`

const Title = ({ children, style }) => <Text style={style}>{children}</Text>

export default memo(Title)
