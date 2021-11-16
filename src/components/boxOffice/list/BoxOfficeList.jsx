import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import BoxOfficeListItem from './BoxOfficeListItem'
import Paragraph from '@/components/ui/Paragraph'
import useFetch, { preFetch } from '@/core/net/useFetch'
import { yesterDay, getBoxOfficeList, getBoxOfficeDetail } from '@/core/api/boxOfficeApi'

export default function BoxOfficeList() {
	const { data, error } = useFetch({ targetDt: yesterDay }, getBoxOfficeList)

	useEffect(() => {
		if (!data) return

		getDetailPreFetch()
	}, [data])

	if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>
	if (!data) return <ActivityIndicator size="large" />
	const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || []

	async function getDetailPreFetch() {
		for (const rank of ranks) {
			await preFetch({ movieCd: rank.movieCd }, getBoxOfficeDetail)
		}
	}

	return (
		<>
			{ranks.map((item) => (
				<BoxOfficeListItem key={item.rnum} data={item} />
			))}
		</>
	)
}
