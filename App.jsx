import 'react-native-gesture-handler'
import React from 'react'
import RootContainer from '@/navigations/RootContainer'
import Store from '@/core/store'

export default function App() {
	return (
		<Store>
			<RootContainer />
		</Store>
	)
}
