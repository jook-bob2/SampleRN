import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { emailValidator, passwordValidator } from '@/utils/validator'
import { theme } from '@/theme/theme'
import Logo from '@/components/ui/Logo'
import Row from '@/components/ui/Row'
import Title from '@/components/ui/Title'
import { useUser } from '@/core/store/common/providers/UserProvider'

const Container = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 80px;
`

const Label = styled.Text`
	color: ${theme.colors.secondary};
`

const Link = styled.Text`
	font-weight: bold;
	color: ${theme.colors.primary};
`

export default function UserSignIn() {
	const { navigate, replace } = useNavigation()
	const { userState, setUserInfo } = useUser()
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	useFocusEffect(
		useCallback(() => {
			if (userState.token) {
				navigate('MainScreen')
			}
		}, [userState]),
	)

	function handlePressLogin() {
		if (validationCheck()) {
			auth()
				.signInWithEmailAndPassword(email.value, password.value)
				.then((response) => {
					const { email, uid, displayName, emailVerified } = response.user
					if (emailVerified) {
						setUserInfo({ id: 1, email, token: uid, name: displayName })
						replace('MainScreen')
					} else {
						alert('이메일을 인증해 주세요.')
					}
				})
				.catch((error) => {
					console.log(error)
					if (error.code === 'auth/wrong-password') {
						alert('패스워드가 틀렸습니다.')
					}
					if (error.code === 'auth/user-not-found') {
						alert('유저를 찾을 수 없습니다.')
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
			<Logo width={100} height={100} bottom={40} source={require('@assets/images/signIn.png')} />
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
				<TouchableOpacity onPress={() => alert('미구현 상태입니다.')}>
					<Link>비밀번호 찾기</Link>
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
