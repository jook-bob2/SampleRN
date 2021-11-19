import React, { useCallback } from 'react'
import BoxOfficeListItem from './BoxOfficeListItem'
import Paragraph from '@/components/ui/Paragraph'
import { yesterDay } from '@/core/api/boxOfficeApi'
import { GET_BOX_OFFICE_LIST } from '@/core/store/api/create/boxOfficeCreate'
import { useBoxOfficeContext } from '@/core/store/api/providers/BoxOfficeApiProvider'
import { useFocusEffect } from '@react-navigation/core'
import Loading from '@/components/ui/Loading'

export default function BoxOfficeList() {
	const { state, dispatch } = useBoxOfficeContext()
	const { data, loading, error } = state.BoxOfficeList

	useFocusEffect(
		useCallback(() => {
			getBoxOfficeList()
		}, []),
	)

	async function getBoxOfficeList() {
		try {
			await GET_BOX_OFFICE_LIST(dispatch, { targetDt: yesterDay })
		} catch (err) {
			console.log(err)
		}
	}

	if (error) return <Paragraph>{error}</Paragraph>
	if (loading) return <Loading />

	const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || []

	return (
		<>
			{ranks.map((item) => (
				<BoxOfficeListItem key={item.rnum} data={item} />
			))}
		</>
	)
}
