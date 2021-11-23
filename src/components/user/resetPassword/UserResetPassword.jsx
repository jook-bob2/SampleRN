import Button from '@/components/ui/button/Button'
import TextInput from '@/components/ui/input/TextInput'
import Title from '@/components/ui/text/Title'
import { postResetPassword } from '@/core/api/userApi'
import { theme } from '@/theme'
import { emailValidator } from '@/utils/validator'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	${theme.common.flexCenterColumn}
`

export default function UserResetPassword() {
	const [email, setEmail] = useState({ value: '', error: '' })

	function handlePressSendEmail() {
		const emailError = emailValidator(email.value)

		if (emailError) {
			setEmail({ ...email, error: emailError })
			return
		}

		postResetPassword({ email: email.value })
			.then((result) => {
				console.log(result)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<Container>
			<Title>비밀번호 재설정</Title>
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

			<Button mode="contained" onPress={() => handlePressSendEmail()} style={styles.button}>
				메일 발송
			</Button>
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
