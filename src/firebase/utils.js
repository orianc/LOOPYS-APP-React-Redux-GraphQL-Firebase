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
	console.log('userAuth : ', userAuth);
	// get uid from google userAuth
	const { uid } = userAuth;
	console.log('uid from userAuth : ', uid);

	// try to get userRef in firestore db associate at this uid google,
	// this const become the user doc or stay null
	const userRef = firestore.doc(`users/${uid}`);
	console.log('user ref : ', userRef);

	//
	const snapshot = await userRef.get();
	console.log('snapshot : ', snapshot);

	// if user doesn't exist in db, it will be create here
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
