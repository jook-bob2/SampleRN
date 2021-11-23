import { DefaultTheme } from 'react-native-paper'

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#600EE6',
		secondary: '#414757',
		error: '#f13a59',
		header: '#2E64FE',
	},
	fonts: {
		notoSans: {
			black: 'NotoSansKR-Black',
			bold: 'NotoSansKR-Bold',
			light: 'NotoSansKR-Light',
			medium: 'NotoSansKR-Medium',
			regular: 'NotoSansKR-Regular',
			thin: 'NotoSansKR-Thin',
		},
		size: {
			title: 30,
			subTitle: 24,
			paragraph: 18,
		},
	},
	common: {
		flexCenterRow: `
			flex: 1;
			flex-direction: row;
			justify-contents: center;
    		align-items: center;
		`,
		flexCenterColumn: `
			flex: 1;
			flex-direction: column;
			justify-contents: center;
			align-items: center;
		`,
	},
}
