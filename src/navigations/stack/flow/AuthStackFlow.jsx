import React from 'react'
import SignInScreen from '@/screens/user/SignInScreen'
import SignUpScreen from '@/screens/user/SignUpScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function AuthStackFlow() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SignInScreen" component={SignInScreen} />
			<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
		</Stack.Navigator>
	)
}
