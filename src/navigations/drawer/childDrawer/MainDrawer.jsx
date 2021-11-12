import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BoxOfficeListScreen from '@/screens/boxOffice/BoxOfficeListScreen'
import MainScreen from '@screen/main/MainScreen'
import DefaultDrawerNavigator from '../DefaultDrawerNavigator'

const Drawer = createDrawerNavigator()

export default function MainDrawer() {
	return (
		<DefaultDrawerNavigator>
			<Drawer.Screen name="MainScreen" component={MainScreen} options={{ title: '메인' }} />
			<Drawer.Screen
				name="BoxOfficeListScreen"
				component={BoxOfficeListScreen}
				options={{ title: '박스오피스' }}
			/>
		</DefaultDrawerNavigator>
	)
}
