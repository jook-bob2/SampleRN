import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import styled from 'styled-components/native'
import Row from '@/components/ui/Row'
import Paragraph from '@/components/ui/Paragraph'

const ItemView = styled.View`
	padding: 12px;
`

function RankIntenIcon({ rankInten }) {
	if (Number(rankInten) > 0) {
		return '🔼'
	} else if (Number(rankInten) < 0) {
		return '🔽'
	}
	return '⏺'
}

export default function BoxOfficeListItem({ data }) {
	const { navigate } = useNavigation()

	const navigateMovieDetail = useCallback(
		(movieCd) => {
			navigate('BoxOfficeDetailScreen', { params: { movieCd } })
		},
		[navigate],
	)

	return (
		<Pressable onPress={() => navigateMovieDetail(data.movieCd)}>
			<ItemView>
				<Row>
					<Paragraph>{data.rank}</Paragraph>
					<Paragraph>
						<RankIntenIcon rankInten={data.rankInten} /> {Number(data.rankInten)}
					</Paragraph>
					<Paragraph>{data.movieNm}</Paragraph>
					<Paragraph>{data.rankOldAndNew === 'NEW' ? '🆕' : ''}</Paragraph>
				</Row>
			</ItemView>
		</Pressable>
	)
}
