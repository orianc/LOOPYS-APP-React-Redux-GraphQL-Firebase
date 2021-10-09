import { firestore } from '../../firebase/utils';

export const getAuthorName = async (authorId, setAuthor = null) => {
	try {
		const doc = await firestore.collection('users').doc(authorId).get();
		if (setAuthor != null) return setAuthor(doc.data());
		return doc.data();
	} catch (e) {
		console.error(e);
	}
};
