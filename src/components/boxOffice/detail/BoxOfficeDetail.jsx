import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useEffect } from 'react'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'
import Link from '@/components/ui/Link'
import Row from '@/components/ui/Row'
import Paragraph from '@/components/ui/Paragraph'
import { useBoxOfficeContext } from '@/core/store/api/providers/BoxOfficeApiProvider'
import { GET_BOX_OFFICE_DETAIL } from '@/core/store/api/create/boxOfficeCreate'

export default function BoxOfficeDetail() {
	const { params } = useRoute()
	const navigation = useNavigation()
	const { state, dispatch } = useBoxOfficeContext()
	const { data, loading, error } = state.BoxOfficeDetail

	useEffect(() => {
		if (data) {
			navigation.setOptions({
				title: data?.movieInfoResult?.movieInfo.movieNm,
			})
		}
	}, [data])

	useFocusEffect(
		useCallback(() => {
			getBoxOfficeDetail()
		}, [params]),
	)

	async function getBoxOfficeDetail() {
		try {
			await GET_BOX_OFFICE_DETAIL(dispatch, {
				movieCd: params.params.movieCd,
			})
		} catch (err) {
			console.log(err)
		}
	}

	if (error) return <Paragraph>{error}</Paragraph>
	if (loading || !data) return <ActivityIndicator size="large" />

	const detail = data?.movieInfoResult?.movieInfo || {}

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
