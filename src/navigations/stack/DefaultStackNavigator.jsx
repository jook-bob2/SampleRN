import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainDrawerFlow from '../drawer/flow/MainDrawerFlow'
import { UserStateContext } from '@/core/store/common/create'
import AuthStackFlow from './flow/AuthStackFlow'

const Stack = createNativeStackNavigator()

export default function DefaultStackNavigator() {
	const { userState } = useContext(UserStateContext)
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!userState.token ? (
				<Stack.Screen name="AuthStackFlow" component={AuthStackFlow} />
			) : (
				<Stack.Screen name="MainDrawerFlow" component={MainDrawerFlow} />
			)}
		</Stack.Navigator>
	)
}
