import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DefaultDrawerNavigator from './drawer/DefaultDrawerNavigator'

export default function RootContainer() {
	return (
		<NavigationContainer>
			<DefaultDrawerNavigator />
		</NavigationContainer>
	)
}
