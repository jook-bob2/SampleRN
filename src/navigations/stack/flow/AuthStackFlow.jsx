import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '@/screens/user/SignInScreen'
import SignUpScreen from '@/screens/user/SignUpScreen'
import { UserStateContext } from '@/core/store/common/create'

const Stack = createNativeStackNavigator()

export default function AuthStackFlow() {
	const { userState } = useContext(UserStateContext)
	return (
		<>
			{!userState.token && (
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="SignInScreen" component={SignInScreen} />
					<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
				</Stack.Navigator>
			)}
		</>
	)
}
