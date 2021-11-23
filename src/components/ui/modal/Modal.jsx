import { useAlert } from '@/core/store/common/providers/AlertProvider'
import React, { memo } from 'react'
import { Modal, StyleSheet } from 'react-native'
import Button from '../button/Button'
import SmallText from '../text/SmallText'
import styled from 'styled-components/native'
import { theme } from '@/theme'
import Paragraph from '../text/Paragraph'
import { useConfirm } from '@/core/store/common/providers/ConfirmProvider'

const Contents = styled.View`
	${theme.common.flexCenterColumn}
	background-color: ${theme.colors.disabled};
`

const Wrap = styled.View`
	width: 80%;
	background-color: ${theme.colors.background};
	padding: 22px;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
`

const TitleView = styled.View`
	width: 100%;
	padding-left: 5px;
	background-color: ${theme.colors.background};
	justify-content: flex-start;
	align-items: flex-start;
`

const ButtonView = styled.View`
	margin-top: 10px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`

function Alert() {
	const { alertState, closeAlert } = useAlert()

	return (
		<Modal transparent={true} visible={alertState.isOpen} animationIn="slideInLeft" animationOut="slideOutRight">
			<Contents>
				<Wrap>
					{alertState.title && (
						<TitleView>
							<Paragraph>{alertState.title}</Paragraph>
						</TitleView>
					)}
					<SmallText>{alertState.msg}</SmallText>
					<ButtonView>
						<Button
							mode="contained"
							style={styles.closeBtn}
							onPress={() => {
								closeAlert()
							}}>
							닫기
						</Button>
					</ButtonView>
				</Wrap>
			</Contents>
		</Modal>
	)
}

function Confirm() {
	const { confirmState, closeConfirm } = useConfirm()

	return (
		<Modal transparent={true} visible={confirmState.isOpen} animationIn="slideInLeft" animationOut="slideOutRight">
			<Contents>
				<Wrap>
					{confirmState.title && (
						<TitleView>
							<Paragraph>{confirmState.title}</Paragraph>
						</TitleView>
					)}
					<SmallText>{confirmState.msg}</SmallText>
					<ButtonView>
						<Button
							mode="contained"
							style={styles.closeBtn}
							onPress={() => {
								closeConfirm()
							}}>
							닫기
						</Button>
						<Button
							mode="contained"
							style={styles.confirmBtn}
							onPress={() => {
								confirmState.onPress()
							}}>
							확인
						</Button>
					</ButtonView>
				</Wrap>
			</Contents>
		</Modal>
	)
}

const styles = StyleSheet.create({
	closeBtn: {
		maxWidth: 100,
		backgroundColor: theme.colors.backdrop,
		marginRight: 10,
		marginLeft: 10,
	},
	confirmBtn: {
		maxWidth: 100,
		backgroundColor: theme.colors.notification,
		marginRight: 10,
		marginLeft: 10,
	},
})

export default { Alert: memo(Alert), Confirm: memo(Confirm) }
