import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect } from 'react'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'
import { getBoxOfficeDetail } from '@/core/api/boxOfficeApi'
import Link from '@/components/ui/Link'
import Row from '@/components/ui/Row'
import useFetch from '@/core/net/useFetch'
import Paragraph from '@/components/ui/Paragraph'

export default function BoxOfficeDetail() {
	const { params } = useRoute()
	console.log('params ==>', params)
	const navigation = useNavigation()

	const { data, error } = useFetch({ movieCd: params.movieCd }, getBoxOfficeDetail)

	useEffect(() => {
		if (data) {
			navigation.setOptions({
				title: data.movieInfoResult.movieInfo.movieNm,
			})
		}
	}, [data])

	if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>
	if (!data) return <ActivityIndicator size="large" />

	const detail = data.movieInfoResult.movieInfo

	return (
		<>
			<Row>
				<Paragraph>영화명 : {detail.movieNm}</Paragraph>
			</Row>
			<Row>
				<Paragraph>상영시간 : {detail.showTm}분</Paragraph>
			</Row>
			<Row>
				<Paragraph>개봉일 : {moment(detail.openDt).format('YYYY년 MM월 DD일')}</Paragraph>
			</Row>
			<Row>
				<Paragraph>
					감독 :{' '}
					{detail.directors.map((director, index) => (
						<Link
							key={index}
							onPress={() => {
								navigation.navigate('BoxOfficeSearchResultScreen', {
									peopleNm: director.peopleNm,
								})
							}}>
							{director.peopleNm}
						</Link>
					))}
				</Paragraph>
			</Row>
			<Row>
				<Paragraph>
					출연 :{' '}
					{detail.actors.map((actor, index) => (
						<Link
							key={index}
							onPress={() => {
								navigation.navigate('BoxOfficeSearchResultScreen', {
									peopleNm: actor.peopleNm,
								})
							}}>
							{actor.peopleNm}
						</Link>
					))}
				</Paragraph>
			</Row>
		</>
	)
}
