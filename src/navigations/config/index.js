import React from 'react'

export function setOptions({ CustomHeader, options = { title: '', isBack: false, tabShown: false } }) {
	const { title, isBack, tabShown } = options

	return {
		header: (props) => <CustomHeader {...props} />,
		isBack,
		title,
		tabShown,
	}
}

export function setBackground({ options = { isFlat: false } }) {
	const { isFlat } = options

	return {
		isFlat,
	}
}
