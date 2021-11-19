import { useFocusEffect, useRoute } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, Text } from 'react-native'
import styled from 'styled-components/native'
import Paragraph from '@/components/ui/Paragraph'
import { useBoxOfficeContext } from '@/core/store/api/providers/BoxOfficeApiProvider'
import { GET_BOX_OFFICE_PEOPLE } from '@/core/store/api/create/boxOfficeCreate'
import Loading from '@/components/ui/Loading'

const Padding = styled.View`
	padding: 20px;
`

export default function BoxOfficeSearchResult() {
	const { params } = useRoute()
	const [list, setList] = useState([])
	const { state, dispatch } = useBoxOfficeContext()
	const { data, loading, error } = state.BoxOfficePeople

	useFocusEffect(
		useCallback(() => {
			getBoxOfficePeopleList()
		}, [params]),
	)

	async function getBoxOfficePeopleList() {
		if (params.peopleNm) {
			try {
				const response = await GET_BOX_OFFICE_PEOPLE(dispatch, { peopleNm: params.peopleNm })
				setList(response.data.peopleListResult?.peopleList)
			} catch (err) {
				console.log(err)
			}
		}
	}

	if (error) return <Paragraph>{error}</Paragraph>
	if (loading || !data) return <Loading />

	return (
		<FlatList
			data={list}
			keyExtractor={(item) => item.peopleCd}
			renderItem={(data) => (
				<Pressable onPress={() => {}}>
					<Paragraph>
						<Padding>
							<Paragraph>
								{data.item.peopleNm} ({data.item.repRoleNm})
							</Paragraph>
							<Text>{data.item.filmoNames}</Text>
						</Padding>
					</Paragraph>
				</Pressable>
			)}
			refreshing={true}
		/>
	)
}
