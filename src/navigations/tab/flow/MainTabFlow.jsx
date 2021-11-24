import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import mainTabList from '../tabList/mainTabList'
import AppContainer from '@/screens/AppContainer'

const Tab = createBottomTabNavigator()

export default function MainTabFlow() {
	return (
		<Tab.Navigator backBehavior="history">
			{mainTabList.map((menu) => (
				<Tab.Screen key={menu.index} name={menu.name} options={menu.options}>
					{(props) => (
						<AppContainer
							{...props}
							Screen={menu.component}
							backgroundOption={menu.backgroundOption}></AppContainer>
					)}
				</Tab.Screen>
			))}
		</Tab.Navigator>
	)
}
