import ResetPasswordScreen from '@/screens/user/ResetPasswordScreen'
import SignInScreen from '@/screens/user/SignInScreen'
import SignUpScreen from '@/screens/user/SignUpScreen'

export default [
	{
		index: 1,
		component: SignInScreen,
		name: 'SignInScreen',
	},
	{
		index: 2,
		component: SignUpScreen,
		name: 'SignUpScreen',
	},
	{
		index: 3,
		component: ResetPasswordScreen,
		name: 'ResetPasswordScreen',
	},
]
