import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { emailValidator, passwordValidator } from '@/utils/validator'
import { theme } from '@/theme'
import Logo from '@/components/ui/Logo'
import { useUser } from '@/core/store/common/providers/UserProvider'
import { postSignIn } from '@/core/api/userApi'
import Title from '@/components/ui/text/Title'
import Row from '@/components/ui/view/Row'
import Button from '@/components/ui/button/Button'
import { useAlert } from '@/core/store/common/providers/AlertProvider'
import TextInput from '@/components/ui/input/TextInput'

const Container = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 80px;
`

const Label = styled.Text`
	color: ${theme.colors.secondary};
	font-family: ${theme.fonts.notoSans.medium};
`

const Link = styled.Text`
	color: ${theme.colors.primary};
	font-family: ${theme.fonts.notoSans.bold};
`

export default function UserSignIn() {
	const { navigate, replace } = useNavigation()
	const { userState, setUserInfo } = useUser()
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const { $alert } = useAlert()

	useFocusEffect(
		useCallback(() => {
			if (userState.token && userState.isLoggined) {
				replace('MainScreen')
			}
		}, [userState]),
	)

	function handlePressLogin() {
		if (validationCheck()) {
			postSignIn({ email: email.value, password: password.value })
				.then((response) => {
					const user = response.user
					if (user.emailVerified) {
						setUserInfo({
							id: 1,
							email: user.email,
							token: user.uid,
							name: user.displayName,
							isLoggined: true,
						})
					} else {
						$alert('이메일을 인증해 주세요.')
					}
				})
				.catch((error) => {
					console.log(error)
					if (error.code === 'auth/wrong-password') {
						// $alert('패스워드가 틀렸습니다.')
						$alert({ title: '로그인 오류', msg: '패스워드가 틀렸습니다.' })
					}
					if (error.code === 'auth/user-not-found') {
						$alert('유저를 찾을 수 없습니다.')
					}
					if (error.code === 'auth/too-many-requests') {
						$alert({
							title: '로그인 오류',
							msg: '요청 횟수가 초과되었습니다.\n 비밀번호를 재설정 하세요.',
						})
					}
				})
		}
	}

	function validationCheck() {
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)

		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			return false
		}

		return true
	}

	return (
		<Container>
			<Logo width={100} height={100} bottom={12} source={require('@assets/images/signIn.png')} />
			<Title>로그인</Title>

			<TextInput
				label="E-mail"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
				style={styles.textInput}
			/>

			<TextInput
				label="비밀번호"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
				style={styles.textInput}
			/>

			<Row>
				<Label>비밀번호를 잊으셨나요? </Label>
				<TouchableOpacity onPress={() => navigate('ResetPasswordScreen')}>
					<Link>비밀번호 재설정</Link>
				</TouchableOpacity>
			</Row>

			<Button mode="contained" onPress={handlePressLogin} style={styles.button}>
				로그인
			</Button>
			<Button mode="contained" onPress={() => navigate('SignUpScreen')} style={styles.button}>
				회원가입
			</Button>
		</Container>
	)
}

const styles = StyleSheet.create({
	button: {
		maxWidth: 200,
	},
	textInput: {
		maxWidth: 300,
	},
})
