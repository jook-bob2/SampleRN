import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '@/navigations/drawer/content/CustomDrawerContent'
import Header from '@/components/ui/Header'
import AuthStackFlow from '../stack/flow/AuthStackFlow'
import BackStackFlow from '../stack/flow/BackStackFlow'
import MainStackFlow from '../stack/flow/MainStackFlow'

const Drawer = createDrawerNavigator()

export default function DefaultDrawerNavigator() {
	return (
		<Drawer.Navigator
			// initialRouteName="Main"
			drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen
				name="AuthStackFlow"
				component={AuthStackFlow}
				options={{
					title: '인증 플로우',
					headerShown: false,
				}}
			/>

			<Drawer.Screen
				name="MainStackFlow"
				component={MainStackFlow}
				options={{
					title: '메인 플로우',
					header: ({ options, navigation }) => (
						<Header
							options={{ ...options, name: 'MainStackFlow' }}
							navigation={navigation}
							isBack={false}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name="BackStackFlow"
				component={BackStackFlow}
				options={{
					title: '빽 플로우',
					header: ({ options, navigation }) => (
						<Header options={{ ...options, name: 'BackStackFlow' }} navigation={navigation} isBack={true} />
					),
				}}
			/>
		</Drawer.Navigator>
	)
}
