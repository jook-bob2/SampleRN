import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainDrawerFlow from '../drawer/flow/MainDrawerFlow'
import AuthStackFlow from './flow/AuthStackFlow'
import { useUser } from '@/core/store/common/providers/UserProvider'
import MainTabFlow from '../tab/flow/MainTabFlow'
import MovieDrawerFlow from '../drawer/flow/MovieDrawerFlow'

const Stack = createNativeStackNavigator()

export default function DefaultStackNavigator() {
	const { userState } = useUser()

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!userState.token || !userState.isLoggined ? (
				<Stack.Screen name="AuthStackFlow" component={AuthStackFlow} />
			) : (
				<>
					<Stack.Screen name="MainDrawerFlow" component={MainDrawerFlow} />
					<Stack.Screen name="MovieDrawerFlow" component={MovieDrawerFlow} />
					<Stack.Screen name="MainTabFlow" component={MainTabFlow} />
				</>
			)}
		</Stack.Navigator>
	)
}
