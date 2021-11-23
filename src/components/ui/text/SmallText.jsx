import React, { memo } from 'react'
import { theme } from '@/theme'
import styled from 'styled-components/native'

const Text = styled.Text`
	font-size: ${theme.fonts.size.small}px;
	color: ${({ style }) => style?.color || theme.colors.onSurface};
	font-family: ${({ style }) => style?.fontFamily || theme.fonts.notoSans.regular};
`

const SmallText = ({ children, style }) => <Text style={style}>{children}</Text>

export default memo(SmallText)
