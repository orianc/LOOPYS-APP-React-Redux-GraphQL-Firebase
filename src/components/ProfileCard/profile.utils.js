import { firestore } from './../../firebase/utils';

export const updateProfile = (user) => {
	const uid = user.id;
	const ref = firestore.collection('users').doc(uid);

	ref.update(user);
};
