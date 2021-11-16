import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoxOfficeDetailScreen from '@/screens/boxOffice/BoxOfficeDetailScreen'
import BoxOfficeSearchResultScreen from '@/screens/boxOffice/BoxOfficeSearchResultScreen'
import { UserStateContext } from '@/core/store/common/create'

const Stack = createNativeStackNavigator()

export default function BackStackFlow() {
	const { userState } = useContext(UserStateContext)
	return (
		<>
			{userState.token && (
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="BoxOfficeDetailScreen" component={BoxOfficeDetailScreen} />
					<Stack.Screen name="BoxOfficeSearchResultScreen" component={BoxOfficeSearchResultScreen} />
				</Stack.Navigator>
			)}
		</>
	)
}
