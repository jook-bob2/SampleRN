import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '@/theme'
import styled from 'styled-components/native'

const View = styled.View`
	width: 100%;
	margin-vertical: 12px;
`

const Text = styled.Text`
	font-size: 14px;
	color: ${theme.colors.error};
	padding-horizontal: 4px;
	padding-top: 4px;
	font-family: ${theme.fonts.notoSans.bold};
`

const TextInput = ({ errorText, style, ...props }) => {
	return (
		<View style={style}>
			<Input
				style={styles.input}
				selectionColor={theme.colors.primary}
				underlineColor="transparent"
				mode="outlined"
				{...props}
			/>
			{errorText ? <Text>{errorText}</Text> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: theme.colors.surface,
		fontFamily: `${theme.fonts.notoSans.regular}`,
	},
})

export default memo(TextInput)
