import React from 'react'
import styled from 'styled-components/native'
import { StatusBar, Platform } from 'react-native'

const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background: #ffffff;
`

// 키보드 동작성 감지 컴포넌트
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
`

const Contents = styled.View`
	padding: 8px 24px;
	background: pink;
`

export default function BasicLayout({ children }) {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Container>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<Contents>{children}</Contents>
				</KeyboardAvoidingView>
			</Container>
		</>
	)
}
