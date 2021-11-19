import Background from '@/components/ui/Background'
import React from 'react'

export default function AppContainer(props) {
	const { Screen, backgroundOption } = props
	return (
		<Background options={backgroundOption}>
			<Screen />
		</Background>
	)
}
