import Header from '@/components/ui/Header'
import BoxOfficeDetailScreen from '@/screens/boxOffice/BoxOfficeDetailScreen'
import BoxOfficeListScreen from '@/screens/boxOffice/BoxOfficeListScreen'
import BoxOfficeSearchResultScreen from '@/screens/boxOffice/BoxOfficeSearchResultScreen'
import MainScreen from '@/screens/main/MainScreen'
import MyProfileScreen from '@/screens/profile/MyProfileScreen'
import { setBackground, setOptions } from '../../config'

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
	{
		index: 3,
		component: BoxOfficeListScreen,
		name: 'BoxOfficeListScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '박스오피스 목록' } }),
	},
	{
		index: 4,
		component: BoxOfficeDetailScreen,
		name: 'BoxOfficeDetailScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '박스오피스 상세', isBack: true } }),
	},
	{
		index: 5,
		component: BoxOfficeSearchResultScreen,
		name: 'BoxOfficeSearchResultScreen',
		options: setOptions({ CustomHeader: Header, options: { title: '박스오피스 검색', isBack: true } }),
		backgroundOption: setBackground({ options: { isFlat: true } }),
	},
]
