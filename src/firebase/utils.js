import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

/**Check uuid and users storage */
export const handleUserProfile = async ({ userAuth, additionalData }) => {
	// console.log('userAuth in handleUserProfile: ', userAuth);

	//auth() give us an userAuth object, with Unique User ID,
	if (!userAuth) return;
	const { uid } = userAuth;

	// data users are store in firestore in documents named by uid
	// we check if user exist in firestore
	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	// if user doesn't exist in firestore db, we make it.
	if (!snapshot.exists) {
		const { email, displayName } = userAuth;
		const timestamp = new Date();
		const userRoles = ['user'];

		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp,
				userRoles,
				...additionalData,
			});
		} catch (error) {
			console.error('error on create user', error);
		}
	}
	// console.log('userRef from firebase, handleUserProfile', userRef, 1);
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
