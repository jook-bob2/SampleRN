import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '@/navigations/drawer/content/CustomDrawerContent'

const Drawer = createDrawerNavigator()

export default function DefaultDrawerNavigator({ children }) {
	return <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>{children}</Drawer.Navigator>
}
