import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from '@/screens/main/MainScreen'
import BoxOfficeListScreen from '@/screens/boxOffice/BoxOfficeListScreen'
import MyProfileScreen from '@/screens/profile/MyProfileScreen'
import { UserStateContext } from '@/core/store/common/create'

const Stack = createNativeStackNavigator()

export default function MainStackFlow() {
	const { userState } = useContext(UserStateContext)
	return (
		<>
			{userState.token && (
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
					<Stack.Screen name="MainScreen" component={MainScreen} />
					<Stack.Screen name="BoxOfficeListScreen" component={BoxOfficeListScreen} />
					<Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
				</Stack.Navigator>
			)}
		</>
	)
}
