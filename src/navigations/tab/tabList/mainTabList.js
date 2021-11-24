import Header from '@/components/ui/Header'
import { setOptions } from '@/navigations/config'
import MainScreen from '@/screens/main/MainScreen'
import MyProfileScreen from '@/screens/profile/MyProfileScreen'

export default [
	{
		index: 1,
		component: MainScreen,
		name: 'MainScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '메인', isBack: false } }),
	},
	{
		index: 2,
		component: MyProfileScreen,
		name: 'MyProfileScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '나의 프로필', isBack: true } }),
	},
]
