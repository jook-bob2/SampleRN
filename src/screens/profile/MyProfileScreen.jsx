import React from 'react'
import { Text, View } from 'react-native'
import { theme } from '@theme/'

export default function MyProfileScreen() {
	return (
		<View style={{ padding: 20 }}>
			<Text style={{ fontSize: 20, fontFamily: `${theme.fonts.notoSans.bold}` }}>마이 프로필</Text>
		</View>
	)
}
