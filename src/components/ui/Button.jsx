import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '@/theme'

const Button = ({ mode, style, children, ...props }) => (
	<PaperButton
		style={[styles.button, mode === 'outlined' && { backgroundColor: theme.colors.surface }, style]}
		labelStyle={styles.text}
		mode={mode}
		{...props}>
		{children}
	</PaperButton>
)

const styles = StyleSheet.create({
	button: {
		width: '80%',
		height: 50,
		marginVertical: 10,
		borderRadius: 25,
		paddingTop: 2,
	},
	text: {
		fontSize: 16,
		lineHeight: 26,
		color: '#ffffff',
		fontFamily: `${theme.fonts.notoSans.bold}`,
	},
})

export default memo(Button)
