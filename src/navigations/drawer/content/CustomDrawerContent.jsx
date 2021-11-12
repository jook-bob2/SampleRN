import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			{/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
		</DrawerContentScrollView>
	)
}
