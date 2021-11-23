import auth from '@react-native-firebase/auth'

export function getCurrentUser() {
	return auth().currentUser
}

export async function postSignIn({ email, password }) {
	return await auth().signInWithEmailAndPassword(email, password)
}

export async function postSignUp({ email, password }) {
	return await auth().createUserWithEmailAndPassword(email, password)
}

export async function postResetPassword({ email }) {
	return await auth().sendPasswordResetEmail(email)
}
