import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import authStackList from '../stackList/authStackList'
import AppContainer from '@/screens/AppContainer'

const Stack = createNativeStackNavigator()

export default function AuthStackFlow() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{authStackList.map((menu) => (
				<Stack.Screen key={menu.index} name={menu.name}>
					{(props) => (
						<AppContainer {...props} Screen={menu.component} backgroundOption={menu.backgroundOption} />
					)}
				</Stack.Screen>
			))}
		</Stack.Navigator>
	)
}
