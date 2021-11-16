import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DefaultDrawerNavigator from './drawer/DefaultDrawerNavigator'
import DefaultStackNavigator from './stack/DefaultStackNavigator'

export default function RootContainer() {
	return (
		<NavigationContainer>
			{/* <DefaultDrawerNavigator /> */}
			<DefaultStackNavigator />
		</NavigationContainer>
	)
}
