import React from 'react'
import SignInScreen from '@/screens/user/SignInScreen'
import SignUpScreen from '@/screens/user/SignUpScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default function AuthDrawerFlow() {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="SignInScreen" component={SignInScreen} />
			<Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
		</Drawer.Navigator>
	)
}
