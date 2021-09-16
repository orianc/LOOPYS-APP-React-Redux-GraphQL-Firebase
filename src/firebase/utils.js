import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

/**Check if user is sign in */
export const handleUserProfile = async ({ userAuth, additionalData }) => {
	if (!userAuth) return;
	const { uid } = userAuth;

	const userRef = firestore.doc(`users/${uid}`);
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
			console.error('error on create user', error);
		}
	}
	console.log('userRef from firebase, handleUserProfile', userRef, 1);
	return userRef;
};

export const getCurrentUser = () => {
	return new Promise((resolve, rejects) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, rejects);
	});
};
