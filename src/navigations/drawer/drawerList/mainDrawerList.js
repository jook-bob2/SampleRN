import Header from '@/components/ui/Header'
import MainScreen from '@/screens/main/MainScreen'
import MyProfileScreen from '@/screens/profile/MyProfileScreen'
import { setOptions } from '../../config'

export default [
	{
		index: 1,
		component: MainScreen,
		name: 'MainScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '메인' } }),
	},
	{
		index: 2,
		component: MyProfileScreen,
		name: 'MyProfileScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '나의 프로필' } }),
	},
]
