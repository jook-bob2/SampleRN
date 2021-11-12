import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DefaultStackNavigator from './stack/DefaultStackNavigator'

export default function RootContainer() {
	return (
		<NavigationContainer>
			<DefaultStackNavigator />
		</NavigationContainer>
	)
}
