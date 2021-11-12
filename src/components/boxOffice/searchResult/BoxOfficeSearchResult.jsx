import { useFocusEffect, useRoute } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, Text } from 'react-native'
import styled from 'styled-components/native'
import { getBoxOfficePeople } from '@/core/api/boxOfficeApi'
import Paragraph from '@/components/ui/Paragraph'

const Padding = styled.View`
	padding: 20px;
`

export default function BoxOfficeSearchResult() {
	const { params } = useRoute()
	const [list, setList] = useState([])

	useFocusEffect(
		useCallback(() => {
			getPeopleList()
		}, []),
	)

	async function getPeopleList() {
		if (params.peopleNm) {
			try {
				const response = await getBoxOfficePeople({ peopleNm: params.peopleNm })
				console.log('response :: ', response)
				setList(response.peopleListResult?.peopleList)
			} catch (error) {
				console.log(error.message)
			}
		}
	}

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
		/>
	)
}
