import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import mainTabList from '../tabList/mainTabList'
import AppContainer from '@/screens/AppContainer'
import TabBar from '@/components/ui/TabBar'

const Tab = createBottomTabNavigator()

export default function MainTabFlow() {
	return (
		<Tab.Navigator backBehavior="history" initialRouteName="MainScreen" tabBar={(props) => <TabBar {...props} />}>
			{mainTabList.map((menu) => (
				<Tab.Screen key={menu.index} name={menu.name} options={menu.options} initialParams={menu.params}>
					{(props) => (
						<AppContainer {...props} Screen={menu.component} backgroundOption={menu.backgroundOption} />
					)}
				</Tab.Screen>
			))}
		</Tab.Navigator>
	)
}
