import React from 'react'
import MainScreen from '@/screens/main/MainScreen'
import BoxOfficeListScreen from '@/screens/boxOffice/BoxOfficeListScreen'
import MyProfileScreen from '@/screens/profile/MyProfileScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawerContent from '../content/CustomDrawerContent'
import Header from '@/components/ui/Header'
import BoxOfficeSearchResultScreen from '@/screens/boxOffice/BoxOfficeSearchResultScreen'
import BoxOfficeDetailScreen from '@/screens/boxOffice/BoxOfficeDetailScreen'

const Drawer = createDrawerNavigator()

const options = {
	header: (props) => <Header {...props} />,
}

export default function MainDrawerFlow() {
	return (
		<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen
				name="MainScreen"
				component={MainScreen}
				options={{
					...options,
					title: '메인',
					isBack: false,
				}}
			/>
			<Drawer.Screen
				name="BoxOfficeListScreen"
				component={BoxOfficeListScreen}
				options={{
					...options,
					title: '박스오피스 목록',
					isBack: false,
				}}
			/>
			<Drawer.Screen
				name="MyProfileScreen"
				component={MyProfileScreen}
				options={{
					...options,
					title: '프로필',
					isBack: false,
				}}
			/>

			<Drawer.Screen
				name="BoxOfficeDetailScreen"
				component={BoxOfficeDetailScreen}
				options={{
					...options,
					title: '박스오피스 상세',
					isBack: true,
				}}
			/>
			<Drawer.Screen
				name="BoxOfficeSearchResultScreen"
				component={BoxOfficeSearchResultScreen}
				options={{
					...options,
					title: '박스오피스 검색',
					isBack: true,
				}}
			/>
		</Drawer.Navigator>
	)
}
