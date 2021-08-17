import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
	if (!userAuth) return;
	// console.log('userAuth : ', userAuth);

	// -- get uid from google userAuth
	const { uid } = userAuth;
	// -- try to SELECT in db the document associate at this uid google,
	const userRef = firestore.doc(`users/${uid}`);
	// -- GET value from document previously selected
	const snapshot = await userRef.get();

	// if user doesn't exist in db, we make it.
	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const timestamp = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp,
				...additionalData,
			});
		} catch (error) {
			console.error(error);
		}
	}
	return userRef;
};
