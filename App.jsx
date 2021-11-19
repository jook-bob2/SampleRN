import 'react-native-gesture-handler'
import React from 'react'
import RootContainer from '@/navigations/RootContainer'
import Store from '@/core/store'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Reanimated 2'])

export default function App() {
	return (
		<Store>
			<RootContainer />
		</Store>
	)
}
