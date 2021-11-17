import { theme } from '@/theme'
import React from 'react'
import styled from 'styled-components/native'

const Component = styled.Text`
	font-size: 20px;
	font-family: ${theme.fonts.notoSans.bold};
`

export default function Paragraph({ children }) {
	return <Component>{children}</Component>
}
