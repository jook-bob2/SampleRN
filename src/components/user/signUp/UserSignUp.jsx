import React, { memo, useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from '@/theme'
import { emailValidator, nameValidator, passwordCheckValidator, passwordValidator } from '@/utils/validator'
import Logo from '@/components/ui/Logo'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'
import auth from '@react-native-firebase/auth'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import styled from 'styled-components/native'
import Title from '@/components/ui/Title'
import { useUser } from '@/core/store/common/providers/UserProvider'

const Container = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 30px;
`

const Row = styled.View`
	flex-direction: row;
	margin-top: 4px;
`

const Label = styled.Text`
	color: ${theme.colors.secondary};
	font-family: ${theme.fonts.notoSans.medium};
`

const Link = styled.Text`
	color: ${theme.colors.primary};
	font-family: ${theme.fonts.notoSans.bold};
`

function UserSignUp() {
	const [name, setName] = useState({ value: '', error: '' })
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [passwordCheck, setPasswordCheck] = useState({ value: '', error: '' })
	const { userState } = useUser()
	const { navigate } = useNavigation()

	useFocusEffect(
		useCallback(() => {
			if (userState.token) {
				navigate('MainScreen')
			}
		}, [userState]),
	)

	const handlePressSignUp = () => {
		const nameError = nameValidator(name.value)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		const passwordCheckError = passwordCheckValidator(password.value, passwordCheck.value)

		if (emailError || passwordError || nameError || passwordCheckError) {
			setName({ ...name, error: nameError })
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			setPasswordCheck({ ...passwordCheck, error: passwordCheckError })
			return
		}

		auth()
			.createUserWithEmailAndPassword(email.value, password.value)
			.then(() => {
				const { updateProfile, sendEmailVerification } = auth().currentUser

				updateProfile({
					displayName: name.value,
				})
					.then(() => {
						navigate('SignInScreen')
					})
					.catch((err) => {
						console.log('currentuser err => ', err)
					})

				sendEmailVerification()
			})
			.catch((error) => {
				console.log(error)
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!')
				}

				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!')
				}

				if (error.code === 'auth/weak-password') {
					console.log('The given password is invalid. [ Password should be at least 6 characters ]]')
				}
			})
	}

	return (
		<Container>
			<Logo source={require('@assets/images/signUp.png')} />
			<Title>회원가입</Title>
			<TextInput
				label="이름"
				returnKeyType="next"
				value={name.value}
				onChangeText={(text) => setName({ value: text, error: '' })}
				error={!!name.error}
				errorText={name.error}
				style={styles.textInput}
			/>
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
			<TextInput
				label="비밀번호 확인"
				returnKeyType="done"
				value={passwordCheck.value}
				onChangeText={(text) => setPasswordCheck({ value: text, error: '' })}
				error={!!passwordCheck.error}
				errorText={passwordCheck.error}
				secureTextEntry
				style={styles.textInput}
			/>
			<Button mode="contained" onPress={handlePressSignUp} style={styles.button}>
				가입 신청
			</Button>
			<Row>
				<Label>이미 계정이 있으신가요? </Label>
				<TouchableOpacity onPress={() => navigate('SignInScreen')}>
					<Link>로그인</Link>
				</TouchableOpacity>
			</Row>
		</Container>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 24,
		maxWidth: 200,
	},
	textInput: {
		maxWidth: 300,
	},
})

export default memo(UserSignUp)
