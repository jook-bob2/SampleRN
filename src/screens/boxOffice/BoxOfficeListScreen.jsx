import React from 'react'
import BoxOfficeContainer from '@/containers/boxOffice/BoxOfficeListContainer'
import BasicLayout from '@/components/ui/layout/BasicLayout'

export default function BoxOfficeListScreen() {
	return (
		<BasicLayout>
			<BoxOfficeContainer />
		</BasicLayout>
	)
}
