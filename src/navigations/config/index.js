import React from 'react'

export function setOptions({ CustomHeader, options = { title: '', isBack: false } }) {
	const { title, isBack } = options

	return {
		header: (props) => <CustomHeader {...props} />,
		isBack,
		title,
	}
}

export function setBackground({ options = { isFlat: false } }) {
	const { isFlat } = options

	return {
		isFlat,
	}
}
