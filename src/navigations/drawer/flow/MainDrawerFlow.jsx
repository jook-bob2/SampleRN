import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '../content/CustomDrawerContent'
import mainDrawerList from '../drawerList/mainDrawerList'
import AppContainer from '@/screens/AppContainer'

const Drawer = createDrawerNavigator()

export default function MainDrawerFlow() {
	return (
		<Drawer.Navigator backBehavior="history" drawerContent={(props) => <CustomDrawerContent {...props} />}>
			{mainDrawerList.map((menu) => (
				<Drawer.Screen key={menu.index} name={menu.name} options={menu.options}>
					{(props) => (
						<AppContainer {...props} Screen={menu.component} backgroundOption={menu.backgroundOption} />
					)}
				</Drawer.Screen>
			))}
		</Drawer.Navigator>
	)
}
