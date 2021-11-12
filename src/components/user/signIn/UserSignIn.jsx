import React, { useCallback, useContext, useState } from 'react'
import { Keyboard, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { UserStateContext } from '@/core/store/common/create'
import Button from '@/components/ui/Button'
import Background from '@/components/ui/Background'
import TextInput from '@/components/ui/TextInput'
import { emailValidator, passwordValidator } from '@/utils/validator'
import Header from '@/components/ui/Header'
import { theme } from '@/theme/theme'

// const Container = styled.SafeAreaView`
// 	flex: 1;
// 	background-color: #fff;
// 	align-items: center;
// 	justify-content: center;
// `

// 키보드 동작성 감지 컴포넌트
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
`

const Image = styled.Image`
	margin-bottom: 40px;
	width: 100px;
	height: 100px;
`

// const InputView = styled.View`
// 	/* background-color: #ffc0cb; */
// 	background-color: ${theme.colors.surface};
// 	border-radius: 30px;
// 	width: 70%;
// 	height: 45px;
// 	margin-bottom: 20px;
// 	align-items: center;
// `

// const TextInput = styled.TextInput`
// 	height: 50px;
// 	flex: 1;
// 	padding: 10px;
// 	margin-left: 20px;
// `

const Label = styled.Text`
	color: ${theme.colors.secondary};
`

const Row = styled.View`
	flex-direction: row;
	margin: 4px 4px 8px 4px;
`

const Link = styled.Text`
	font-weight: bold;
	color: ${theme.colors.primary};
`

// const LoginBtn = styled.TouchableOpacity`
// 	width: 80%;
// 	border-radius: 25px;
// 	height: 50px;
// 	align-items: center;
// 	justify-content: center;
// 	margin-top: 40px;
// 	background-color: #ff1493;
// `

// const LoginText = styled.Text`
// 	font-size: 18px;
// 	font-weight: bold;
// 	color: #ffffff;
// `

export default function UserSignIn() {
	const { navigate } = useNavigation()
	const { userState, setUserInfo } = useContext(UserStateContext)
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	useFocusEffect(
		useCallback(() => {
			if (userState.token) {
				navigate('Main')
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
						navigate('Main')
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
		<Background>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<Image source={require('@/assets/images/signIn.png')} />
					<Header>로그인</Header>

					<StatusBar style="auto" />

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

					<Row>
						<Label>비밀번호를 잊으셨나요? </Label>
						<TouchableOpacity onPress={() => alert('미구현 상태입니다.')}>
							<Link>비밀번호 찾기</Link>
						</TouchableOpacity>
					</Row>

					<Button mode="contained" onPress={handlePressLogin}>
						로그인
					</Button>
					<Button mode="contained" onPress={() => navigate('SignUp')}>
						회원가입
					</Button>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</Background>
	)
}
