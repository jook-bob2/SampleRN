import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { theme } from '@theme/theme'
import { emailValidator, nameValidator, passwordValidator } from '@/utils/validator'
import Background from '@/components/ui/Background'
import BackButton from '@/components/ui/BackButton'
import Logo from '@/components/ui/Logo'
import Header from '@/components/ui/Header'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'
import auth from '@react-native-firebase/auth'
import { UserStateContext } from '@/core/store/common/create'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import styled from 'styled-components/native'

// 키보드 동작성 감지 컴포넌트
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
`

const Row = styled.View`
	flex-direction: row;
	margin-top: 4px;
`

const Label = styled.Text`
	color: ${theme.colors.secondary};
`

const Link = styled.Text`
	font-weight: bold;
	color: ${theme.colors.primary};
`

function UserSignUp() {
	const [name, setName] = useState({ value: '', error: '' })
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const { userState } = useContext(UserStateContext)
	const { navigate, goBack } = useNavigation()
	const [showBackBtn, setShowBackBtn] = useState(true)

	useFocusEffect(
		useCallback(() => {
			if (userState.token) {
				navigate('Main')
			}
		}, [userState]),
	)

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => setShowBackBtn(false))
		Keyboard.addListener('keyboardDidHide', () => setShowBackBtn(true))
	}, [])

	const handlePressSignUp = () => {
		const nameError = nameValidator(name.value)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)

		if (emailError || passwordError || nameError) {
			setName({ ...name, error: nameError })
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			return
		}

		auth()
			.createUserWithEmailAndPassword(email.value, password.value)
			.then(() => {
				const currentUser = auth().currentUser

				currentUser
					.updateProfile({
						displayName: name.value,
					})
					.then(() => {
						navigate('SignIn')
					})
					.catch((err) => {
						console.log('currentuser err => ', err)
					})

				currentUser.sendEmailVerification()
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
		<Background>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					{showBackBtn && <BackButton goBack={goBack} />}
					<Logo />
					<Header>회원가입</Header>
					<TextInput
						label="이름"
						returnKeyType="next"
						value={name.value}
						onChangeText={(text) => setName({ value: text, error: '' })}
						error={!!name.error}
						errorText={name.error}
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
					/>
					<TextInput
						label="비밀번호"
						returnKeyType="done"
						value={password.value}
						onChangeText={(text) => setPassword({ value: text, error: '' })}
						error={!!password.error}
						errorText={password.error}
						secureTextEntry
					/>
					<Button mode="contained" onPress={handlePressSignUp} style={styles.button}>
						가입 신청
					</Button>
					<Row>
						<Label>이미 계정이 있으신가요? </Label>
						<TouchableOpacity onPress={() => navigate('SignIn')}>
							<Link>로그인</Link>
						</TouchableOpacity>
					</Row>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</Background>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 24,
	},
})

export default memo(UserSignUp)
