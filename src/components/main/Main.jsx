import React from 'react'
import { useUser } from '@/core/store/common/providers/UserProvider'
import styled from 'styled-components/native'
import { theme } from '@/theme'

const Container = styled.View`
	flex: 1;
	padding: 20px;
`

const Contents = styled.View`
	flex: 1;
`

const Text = styled.Text`
	font-size: 20px;
	font-family: ${theme.fonts.notoSans.medium};
`

export default function Main() {
	const { userState } = useUser()

	return (
		<Container>
			<Text>메인 스크린</Text>
			<Contents>
				<Text>토큰 : {userState.token}</Text>
				<Text>이름 : {userState.name}</Text>
				<Text>이메일 : {userState.email}</Text>
			</Contents>
		</Container>
	)
}
