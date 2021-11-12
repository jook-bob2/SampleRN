import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoxOfficeListScreen from '@/screens/boxOffice/BoxOfficeListScreen'
import BoxOfficeDetailScreen from '@/screens/boxOffice/BoxOfficeDetailScreen'
import BoxOfficeSearchResultScreen from '@/screens/boxOffice/BoxOfficeSearchResultScreen'
import MainDrawer from '../drawer/childDrawer/MainDrawer'
import SignInScreen from '@/screens/user/SignInScreen'
import SignUpScreen from '@/screens/user/SignUpScreen'

const Stack = createNativeStackNavigator()

export default function DefaultStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="Main" component={MainDrawer} />
			<Stack.Screen name="BoxOfficeListScreen" component={BoxOfficeListScreen} />
			<Stack.Screen name="BoxOfficeDetailScreen" component={BoxOfficeDetailScreen} />
			<Stack.Screen name="BoxOfficeSearchResultScreen" component={BoxOfficeSearchResultScreen} />
		</Stack.Navigator>
	)
}
