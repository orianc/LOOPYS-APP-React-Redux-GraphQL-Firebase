import { firestore } from '../../firebase/utils';
export const getAuthorName = async (authorId) => {
	if (!authorId) return;
	const doc = firestore.collection('users').doc(authorId);
	return new Promise((resolve, reject) => {
		doc
			.get()
			.then((snapshot) => {
				var data = snapshot.data();
				var name = data.displayName;
				console.log(name);
				resolve(name);
			})
			.catch((e) => reject(e));
	});
};
