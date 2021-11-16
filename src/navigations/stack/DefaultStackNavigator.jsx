import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthDrawerFlow from '../drawer/flow/AuthDrawerFlow'
import MainDrawerFlow from '../drawer/flow/MainDrawerFlow'
import { UserStateContext } from '@/core/store/common/create'

const Stack = createNativeStackNavigator()

export default function DefaultStackNavigator() {
	const { userState } = useContext(UserStateContext)
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!userState.token ? (
				<Stack.Screen name="AuthDrawerFlow" component={AuthDrawerFlow} />
			) : (
				<Stack.Screen name="MainDrawerFlow" component={MainDrawerFlow} />
			)}
		</Stack.Navigator>
	)
}
