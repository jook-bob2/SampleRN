import Header from '@/components/ui/Header'
import { setOptions } from '@/navigations/config'
import mainDrawerList from '@/navigations/drawer/drawerList/mainDrawerList'
import movieDrawerList from '@/navigations/drawer/drawerList/movieDrawerList'
import MainApiOneScreen from '@/screens/main/MainApiOneScreen'
import MainApiThreeScreen from '@/screens/main/MainApiThreeScreen'
import MainApiTwoScreen from '@/screens/main/MainApiTwoScreen'

const screens = [
	{
		index: 1,
		component: MainApiOneScreen,
		name: 'MainApiOneScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '메인API1', tabShown: true } }),
		params: { tabShown: true },
	},
	{
		index: 2,
		component: MainApiTwoScreen,
		name: 'MainApiTwoScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '메인API2', tabShown: true } }),
		params: { tabShown: true },
	},
	{
		index: 3,
		component: MainApiThreeScreen,
		name: 'MainApiThreeScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '메인API3', tabShown: true } }),
		params: { tabShown: true },
	},
]

export default [...mainDrawerList, ...movieDrawerList]
	.filter((value) => value.options.tabShown || value.params?.tabShown)
	.concat(screens)
