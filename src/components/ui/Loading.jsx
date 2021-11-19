import { theme } from '@/theme'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
	flex: 1;
	width: 100%;
	height: 100%;
	/* margin-top: ${getStatusBarHeight()}px; */
	/* background-color: rgba(0, 0, 0, 0, 0.3); */
	z-index: 100;
	justify-content: center;
	align-items: center;
`

const ParentView = styled.View`
	flex: 1;
	width: 100%;
	border: solid 1px purple;
`

const ModalView = styled.View``

const ImageView = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const Image = styled.Image`
	width: 70px;
	height: 100px;
`

const sourceList = [
	require('@assets/images/loading/0.png'),
	require('@assets/images/loading/1.png'),
	require('@assets/images/loading/2.png'),
	require('@assets/images/loading/3.png'),
	require('@assets/images/loading/4.png'),
	require('@assets/images/loading/5.png'),
	require('@assets/images/loading/6.png'),
	require('@assets/images/loading/7.png'),
	require('@assets/images/loading/8.png'),
	require('@assets/images/loading/9.png'),
	require('@assets/images/loading/10.png'),
	require('@assets/images/loading/11.png'),
	require('@assets/images/loading/12.png'),
	require('@assets/images/loading/13.png'),
	require('@assets/images/loading/14.png'),
]

export default function Loading() {
	const [imageNumber, setImageNumber] = useState(0)

	useEffect(() => {
		let count = 0
		let interval = setInterval(() => {
			setImageNumber(count++ % 15)
		}, 1000 / 25)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<Container>
			<ParentView>
				<ModalView style={styles.modalView}>
					<Modal animationType="fade" transparent={true} visible={true}>
						<ImageView>
							<Image source={sourceList[imageNumber]} key={imageNumber} />
						</ImageView>
					</Modal>
				</ModalView>
			</ParentView>
		</Container>
	)
}

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		height: '100%',
		backgroundColor: `${theme.colors.secondary}`,
		opacity: 0.3,
		padding: '100%',
		maxWidth: '100%',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 5,
			height: 10,
		},
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 5,
	},
})
