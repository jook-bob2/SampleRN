import React from 'react'
import styled from 'styled-components/native'

const Component = styled.Text`
	font-size: 20px;
`

export default function Paragraph({ children }) {
	return <Component>{children}</Component>
}
