import React, { memo } from 'react'
import { theme } from '@/theme'
import styled from 'styled-components/native'

const Text = styled.Text`
	font-size: ${theme.fonts.size.subTitle}px;
	color: ${({ style }) => style?.color || theme.colors.surface};
	font-family: ${({ style }) => style?.fontFamily || theme.fonts.notoSans.bold};
`

const Subtitle = ({ children, style }) => <Text style={style}>{children}</Text>

export default memo(Subtitle)
