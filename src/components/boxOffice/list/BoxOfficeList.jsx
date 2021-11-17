import React, { useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import BoxOfficeListItem from './BoxOfficeListItem'
import Paragraph from '@/components/ui/Paragraph'
import { yesterDay } from '@/core/api/boxOfficeApi'
import { GET_BOX_OFFICE_LIST } from '@/core/store/api/create/boxOfficeCreate'
import { useBoxOfficeContext } from '@/core/store/api/providers/BoxOfficeApiProvider'
import { useFocusEffect } from '@react-navigation/core'

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
	if (loading) return <ActivityIndicator size="large" />

	const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || []

	return (
		<>
			{ranks.map((item) => (
				<BoxOfficeListItem key={item.rnum} data={item} />
			))}
		</>
	)
}
